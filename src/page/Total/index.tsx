import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { SideBar } from "../../component/SideBar";
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
  const isGotAllTodos = useRef(false);
  const page = useRef(0);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    axios
      .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
        params: {
          filter: "all",
          page: 0,
          is_done: false,
          expiration_date: null,
        },
      })
      .then((res) => {
        setTodos(res.data);
        page.current = 1;
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
          console.log(res.data);
          if (res.data.length === 0) {
            isGotAllTodos.current = true;
          } else {
            setTodos([...todos, res.data]);
            page.current += 1;
          }
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
  }, [isLoading, todos, userInfo?.id]);

  return (
    <Root>
      {isOpen && <CreateTodoModal onClose={onClose} setReLoad={setReLoad} />}
      <SideBar />
      <TodoContainer>
        {todos?.map((todo) => {
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
