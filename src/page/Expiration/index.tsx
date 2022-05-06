import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddBtn } from "../../component/AddBtn";
import { CreateTodoModal } from "../../component/CreateTodoModal";
import { SideBar } from "../../component/SideBar";
import { TodoBox } from "../../component/TodoBox";
import { userSelector } from "../../store/user";
import { dummyTodos } from "../Total/data";

export const Expiration = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [reLoad, setReLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  return (
    <Root>
      {isOpen && <CreateTodoModal onClose={onClose} setReLoad={setReLoad} />}
      <SideBar />
      <TodoContainer>
        {dummyTodos.map((todo) => {
          return <TodoBox key={todo.id} todo={todo} />;
        })}
        expirtion
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
