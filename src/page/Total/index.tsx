import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { Empty } from "../../component/Empty/Empty";
import { SideBar } from "../../component/SideBar";
import { Spinner } from "../../component/Spinner/Spinner";
import { TodoBox } from "../../component/TodoBox";
import { useTodoList } from "../../hooks/todo";
import { ITodos } from "./data";

export const TotalTodos = () => {
  const [request, result] = useTodoList();
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [reLoad, setReLoad] = useState(false);
  const [isGotAllTodos, setIsGotAllTodos] = useState(false);
  const page = useRef(0);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const requestQuery = useCallback(() => {
    request({
      filter: "all",
      page: page.current,
    });
  }, [request]);

  useEffect(() => {
    requestQuery();
  }, [reLoad, requestQuery]);

  useEffect(() => {
    if (!result?.loading && result.error) {
      alert(result.error);
      return;
    }
    if (result.data) {
      if (
        (todos.length > 0 &&
          result.data[result.data.length - 1].id !==
            todos[todos.length - 1].id) ||
        todos.length === 0
      ) {
        setTodos([...todos, ...result.data]);
        page.current += 1;
      }
      if (result.data.length < 15) {
        setIsGotAllTodos(true);
      }
    }
  }, [result, todos]);

  useEffect(() => {
    const loadingTodosWhenScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;
      if (
        result.loading ||
        isGotAllTodos ||
        Math.round(scrollTop + innerHeight) <= scrollHeight
      ) {
        return;
      }
      requestQuery();
    };
    if (isGotAllTodos) {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
      return;
    }
    window.addEventListener("scroll", loadingTodosWhenScroll, true);
    return () => {
      window.removeEventListener("scroll", loadingTodosWhenScroll, true);
    };
  }, [isGotAllTodos, requestQuery, result.loading, todos]);

  if (todos.length === 0 && !result.loading) {
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
        {result.loading ? <Spinner /> : ""}
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
