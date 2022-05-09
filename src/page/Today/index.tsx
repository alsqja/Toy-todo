import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { todayMaker } from "../../component/function/time";
import { PageNation } from "../../component/Pagenation/Pagenation";
import { SideBar } from "../../component/SideBar";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { ITodos } from "../Total/data";

export const Today = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [reLoad, setReLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);

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
          page: page - 1,
          is_done: false,
          expiration_date: new Date(today).getTime().toString(),
        },
      })
      .then((res) => {
        setTodos(res.data.todos);
        setPageNum(res.data.pageNum);
      })
      .catch((err) => {
        console.log(err);
      });
    setReLoad(false);
  }, [navigate, userInfo, reLoad, page]);

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
