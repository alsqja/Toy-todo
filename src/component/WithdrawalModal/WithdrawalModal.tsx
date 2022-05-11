import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useLogout } from "../../hooks/session";
import { useDeleteUser } from "../../hooks/user";

interface Iprop {
  [index: string]: (e: any) => void;
}

export const WithdrawalModal = ({ onClose }: Iprop) => {
  const [password, setPassword] = useState("");
  const logout = useLogout();
  const [request, result] = useDeleteUser();

  const PasswordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  useEffect(() => {
    const modalESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(e);
      }
    };
    document.addEventListener("keyup", modalESC);
    return () => {
      document.removeEventListener("keyup", modalESC);
    };
  }, [onClose]);

  const handleClick = useCallback(() => {
    if (password !== "회원탈퇴") {
      alert("정확히 입력해주세요.");
      return;
    }
    request();
  }, [password, request]);

  useEffect(() => {
    if (result.called) {
      logout();
    }
  });

  return (
    <ModalBackdrop onClick={(e) => onClose(e)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div
          className="close-btn"
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            width: "20px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <AiOutlineClose />
        </div>
        <div className="desc">회원님의 모든 정보가 삭제됩니다.</div>
        <div className="desc">정말로 탈퇴 하시겠습니까?</div>
        <div className="desc">탈퇴하시려면 회원탈퇴를 입력해주세요.</div>
        <StyledDiv>
          <InputBox
            onChange={PasswordHandler}
            value={password}
            type="text"
            placeholder="회원탈퇴"
          />
        </StyledDiv>
        <br />
        <div className="button" onClick={handleClick}>
          회원탈퇴
        </div>
      </ModalView>
    </ModalBackdrop>
  );
};

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  animation: 200ms ${fadeIn} linear;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: #ffffff;
  width: 500px;
  height: 350px;
  border-radius: 20px;

  > div.close_btn {
    background: red;
    cursor: pointer;
  }

  > div.desc {
    background-color: #fff;
    margin-top: 25px;
    color: #b80000;
    font-weight: bold;
    text-align: center;
  }
  > div.button {
    color: white;
    background: red;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    width: 100px;
    height: 50px;
    margin-left: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 5vh;
  margin-top: 20px;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 14px;
  height: 35px;
  width: 200px;
  margin: 5px;
  padding: 5px;
  padding-left: 10px;
`;
