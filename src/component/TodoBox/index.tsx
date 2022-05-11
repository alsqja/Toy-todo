import React, { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useDeleteTodo, useEditTodo } from "../../hooks/todo";
import { ITodos } from "../../page/Total/data";
import theme from "../../styled/theme";
import { todayMaker } from "../function/time";

interface IProps {
  todo: ITodos;
}

export const TodoBox = ({ todo }: IProps) => {
  const [valuse, setValuse] = useState<ITodos>(todo);
  const isDead = +valuse.expiration_date < new Date(todayMaker()).getTime();
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editReq, editRes] = useEditTodo();
  const [deleteReq, deleteRes] = useDeleteTodo();

  useEffect(() => {
    if (editRes.data && editRes.called) {
      if (!editRes.data.contents) {
        setValuse({ ...valuse, is_done: !valuse.is_done });
      } else {
        setIsOpen(false);
        setValuse(editRes.data);
      }
    }
  }, [editRes.called, editRes.data, valuse]);

  const handleClick = useCallback(async () => {
    if (editRes.loading) return;

    if (isDead) {
      alert("만료된 TODO는 수정할 수 없습니다.");
      return;
    }

    try {
      await editReq(valuse.id, "", "", !valuse.is_done);
    } catch (e) {
      console.log(e);
    }
  }, [editReq, editRes.loading, isDead, valuse.id, valuse.is_done]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      let value = e.target.value;

      if (name === "expiration_date") {
        value = new Date(value).getTime().toString();
      }

      setValuse({ ...valuse, [name]: value });
    },
    [valuse]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGAElement>) => {
      e.stopPropagation();
      deleteReq(valuse.id);
    },
    [deleteReq, valuse.id]
  );

  useEffect(() => {
    if (deleteRes.called) {
      window.location.reload();
    }
  }, [deleteRes.called]);

  const handleEdit = useCallback(async () => {
    if (editRes.loading) return;

    try {
      await editReq(
        valuse.id,
        valuse.contents,
        valuse.expiration_date,
        valuse.is_done
      );
    } catch (e) {
      console.log(e);
    }
  }, [
    editReq,
    editRes.loading,
    valuse.contents,
    valuse.expiration_date,
    valuse.id,
    valuse.is_done,
  ]);

  if (isOpen) {
    return (
      <StyledTodo style={{ cursor: "unset" }}>
        <EditContentsBox
          type={"text"}
          value={valuse.contents}
          onChange={handleChange}
          name="contents"
        />
        <EditExpirationDate
          type={"date"}
          value={todayMaker(valuse.expiration_date)}
          onChange={handleChange}
          name="expiration_date"
        />
        <ExpirationDateBox>
          <Btn onClick={handleEdit}>확인</Btn>
          <Btn onClick={() => setIsOpen(false)}>취소</Btn>
        </ExpirationDateBox>
      </StyledTodo>
    );
  }

  return (
    <StyledTodo
      style={
        valuse.is_done
          ? isDead
            ? { backgroundColor: `red` }
            : { backgroundColor: "#dbdbdb" }
          : isDead
          ? { backgroundColor: "red" }
          : {}
      }
      onClick={handleClick}
      onMouseOver={() => !isDead && setIsHover(true)}
      onMouseLeave={() => !isDead && setIsHover(false)}
    >
      <CheckBox type={"checkbox"} checked={valuse.is_done} />
      <ContentsBox className={valuse.is_done ? "isDone" : ""}>
        {valuse.contents}
      </ContentsBox>
      <ExpirationDateBox className={valuse.is_done ? "isDone" : ""}>
        <ExpirationDate>
          {isHover ? (
            <FixBtnBox>
              <FaEdit
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                style={{ padding: "10px" }}
              />
              <FaTrash style={{ padding: "10px" }} onClick={handleDelete} />
            </FixBtnBox>
          ) : (
            new Date(+valuse.expiration_date).toLocaleDateString()
          )}
        </ExpirationDate>
      </ExpirationDateBox>
    </StyledTodo>
  );
};

const StyledTodo = styled.div`
  grid-column: 2 / span 18;
  margin: 10px 0;
  height: 65px;
  border-radius: 10px;
  background-color: #c6996d8e;
  display: flex;
  align-items: center;
  cursor: pointer;
  .isDone {
    text-decoration: line-through;
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin: 20px;
`;

const ContentsBox = styled.div`
  font-size: 25px;
`;

const ExpirationDateBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: right;
  align-items: center;
`;

const ExpirationDate = styled.div`
  margin-right: 40px;
  font-size: 20px;
  color: ${theme.palette.grey2};
`;

const FixBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const EditContentsBox = styled.input`
  margin-left: 40px;
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
  background-color: #dbdbdb;
  width: 50%;
  font-size: 20px;
`;

const EditExpirationDate = styled.input`
  margin-left: 40px;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
  background-color: #dbdbdb;
`;

const Btn = styled.div`
  cursor: pointer;
  margin-right: 30px;
  width: 60px;
  height: 40px;
  border-radius: 10px;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
