import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Empty } from "../../component/Empty/Empty";
import { PageNation } from "../../component/Pagenation/Pagenation";
import { SideBar } from "../../component/SideBar";
import { Spinner } from "../../component/Spinner/Spinner";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { ITodos } from "../Total/data";

export const Expiration = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/todo/user/${userInfo}`, {
        params: {
          filter: "expirated",
          page: page - 1,
        },
      })
      .then((res) => {
        setTodos(res.data.todos);
        setPageNum(res.data.pageNum);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, page, userInfo]);

  if (todos.length === 0 && page === 1 && !isLoading) {
    return <Empty />;
  }

  return (
    <Root>
      <SideBar />
      <TodoContainer>
        {!isLoading &&
          todos.map((todo) => {
            return <TodoBox key={todo.id} todo={todo} />;
          })}
        {isLoading ? <Spinner /> : ""}
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
