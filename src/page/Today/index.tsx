import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { todayMaker } from "../../component/function/time";
import { SideBar } from "../../component/SideBar";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { ITodos } from "../Total/data";

export const Today = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isGotAllTodos = useRef(false);
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [reLoad, setReLoad] = useState(false);
  const page = useRef<number>(0);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    const today = todayMaker();
    axios
      .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
        params: {
          filter: "today",
          page: page.current,
          is_done: false,
          expiration_date: new Date(today).getTime().toString(),
        },
      })
      .then((res) => {
        setTodos(res.data.todos);
        page.current += 1;
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
        isGotAllTodos.current ||
        Math.round(scrollTop + innerHeight) <= scrollHeight
      ) {
        return;
      }
      const today = todayMaker();
      axios
        .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
          params: {
            filter: "today",
            page: page.current,
            is_done: false,
            expiration_date: new Date(today).getTime().toString(),
          },
        })
        .then((res) => {
          setTodos(res.data.todos);
          page.current += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isGotAllTodos.current) {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
      return;
    }
    window.addEventListener("scroll", loadingTodosWhenScroll, true);
    return () => {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
    };
  }, [isLoading, userInfo?.id]);

  return (
    <Root>
      {isOpen && <CreateTodoModal onClose={onClose} setReLoad={setReLoad} />}
      <SideBar />
      <TodoContainer>
        {todos.map((todo) => {
          return <TodoBox key={todo.id} todo={todo} />;
        })}
      </TodoContainer>
      <div onClick={onClose}>
        <AddBtn />
      </div>
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
