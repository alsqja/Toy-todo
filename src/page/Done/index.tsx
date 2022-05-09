import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { PageNation } from "../../component/Pagenation/Pagenation";
import { SideBar } from "../../component/SideBar";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { ITodos } from "../Total/data";

export const Done = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    axios
      .get(`http://localhost:4000/todo/user/${userInfo?.id}`, {
        params: {
          filter: "done",
          page: page - 1,
          is_done: true,
          expiration_date: null,
        },
      })
      .then((res) => {
        setTodos(res.data.todos);
        setPageNum(res.data.pageNum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, page, userInfo]);

  return (
    <Root>
      <SideBar />
      <TodoContainer>
        {todos.map((todo) => {
          return <TodoBox key={todo.id} todo={todo} />;
        })}
      </TodoContainer>
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
