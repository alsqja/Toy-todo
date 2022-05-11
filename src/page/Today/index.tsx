import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { Empty } from "../../component/Empty/Empty";
import { todayMaker } from "../../component/function/time";
import { PageNation } from "../../component/Pagenation/Pagenation";
import { SideBar } from "../../component/SideBar";
import { Spinner } from "../../component/Spinner/Spinner";
import { TodoBox } from "../../component/TodoBox";
import { useTodoList } from "../../hooks/todo";
import { ITodos } from "../Total/data";

export const Today = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [request, result] = useTodoList();

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const requestQuery = useCallback(() => {
    request({
      filter: "today",
      page: page - 1,
      expiration_date: new Date(todayMaker()).getTime().toString(),
    });
  }, [page, request]);

  useEffect(() => {
    requestQuery();
  }, [requestQuery]);

  useEffect(() => {
    if (!result.loading && result.error) {
      console.log(result.error);
      return;
    }
    if (result.data) {
      setTodos(result.data.todos);
      setPageNum(result.data.pageNum);
    }
  }, [result.data, result.error, result.loading]);

  if (todos.length === 0 && page === 1 && !result.loading) {
    return (
      <Empty
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    );
  }

  return (
    <Root>
      {isOpen && <CreateTodoModal onClose={onClose} />}
      <SideBar />
      <TodoContainer>
        {!result.loading &&
          todos.map((todo) => {
            return <TodoBox key={todo.id} todo={todo} />;
          })}
        {result.loading ? <Spinner /> : ""}
      </TodoContainer>
      <div onClick={onClose}>
        <AddBtn />
      </div>
      <PageNation pageNum={pageNum} page={page} setPage={setPage} />
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
