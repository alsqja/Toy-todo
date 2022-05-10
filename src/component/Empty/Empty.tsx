import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { AddBtn } from "../AddBtn";
import { CreateTodoModal } from "../CreateTodoModal";
import { SideBar } from "../SideBar";

interface IProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  setReLoad?: Dispatch<SetStateAction<boolean>>;
}

export const Empty = ({ isOpen, onOpen, onClose, setReLoad }: IProps) => {
  return (
    <>
      <SideBar />
      {isOpen && !!onOpen && !!onClose && !!setReLoad ? (
        <CreateTodoModal onClose={onClose} setReLoad={setReLoad} />
      ) : (
        ""
      )}
      <Root>TODO가 없습니다. 새로운 TODO를 추가해주세요</Root>
      <div onClick={onOpen}>
        <AddBtn />
      </div>
    </>
  );
};

const Root = styled.div`
  margin: 50px 0 0 10%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;
