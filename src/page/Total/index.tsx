import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { Empty } from "../../component/Empty/Empty";
import { SideBar } from "../../component/SideBar";
import { Spinner } from "../../component/Spinner/Spinner";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { ITodos } from "./data";

export const TotalTodos = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [reLoad, setReLoad] = useState(false);
  const [isGotAllTodos, setIsGotAllTodos] = useState(false);
  const page = useRef(0);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
        params: {
          filter: "all",
          page: 0,
        },
      })
      .then((res) => {
        setTodos(res.data);
        page.current = 1;
        setIsGotAllTodos(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setReLoad(false);
  }, [navigate, userInfo, reLoad]);

  useEffect(() => {
    const loadingTodosWhenScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;
      if (
        isLoading ||
        isGotAllTodos ||
        Math.round(scrollTop + innerHeight) <= scrollHeight
      ) {
        return;
      }
      setIsLoading(true);
      axios
        .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
          params: {
            filter: "all",
            page: page.current,
            is_done: false,
            expiration_date: null,
          },
        })
        .then((res) => {
          if (res.data.length < 15) {
            setTodos([...todos, ...res.data]);
            setIsGotAllTodos(true);
          } else {
            setTodos([...todos, ...res.data]);
            page.current += 1;
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isGotAllTodos) {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
      return;
    }
    window.addEventListener("scroll", loadingTodosWhenScroll, true);
    return () => {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
    };
  }, [isGotAllTodos, isLoading, todos, userInfo?.id]);

  if (todos.length === 0 && !isLoading) {
    return (
      <Empty
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        setReLoad={setReLoad}
      />
    );
  }

  return (
    <Root>
      {isOpen && <CreateTodoModal onClose={onClose} setReLoad={setReLoad} />}
      <SideBar />
      <TodoContainer>
        {todos?.map((todo) => {
          return <TodoBox key={todo.id} todo={todo} />;
        })}
        {isLoading ? <Spinner /> : ""}
      </TodoContainer>
      <div onClick={onClose}>
        <AddBtn />
      </div>
      {isGotAllTodos ? <GotAll>모든 TODO를 불러왔습니다.</GotAll> : ""}
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const TodoContainer = styled.div`
  margin-left: 10%;
  padding-top: 30px;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
`;

const GotAll = styled.div`
  width: 80%;
  margin-left: 15%;
  margin-top: 20px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid black;
`;
