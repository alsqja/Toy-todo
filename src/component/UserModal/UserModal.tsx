import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { useEditUser, useUser } from "../../hooks/user";
import { userState } from "../../store/user";
import theme from "../../styled/theme";
import { WithdrawalModal } from "../WithdrawalModal/WithdrawalModal";

interface IProps {
  onClose: () => void;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  old_password: string;
  password: string;
  checkPass: string;
}

export const UserModal = ({ onClose }: IProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [values, setValues] = useState<IUser>({
    id: -1,
    name: "",
    email: "",
    old_password: "",
    password: "",
    checkPass: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [getUserReq, getUserRes] = useUser();
  const [editUserReq, editUserRes] = useEditUser();

  useEffect(() => {
    const modalESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keyup", modalESC);
    return () => {
      document.removeEventListener("keyup", modalESC);
    };
  }, [onClose]);

  useEffect(() => {
    getUserReq();
  }, [getUserReq]);

  useEffect(() => {
    if (getUserRes.data && getUserRes.called) {
      setValues(getUserRes.data);
    }
  }, [getUserRes.called, getUserRes.data]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      const value = e.target.value;

      setValues({ ...values, [name]: value });
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    if (editUserRes.loading) return;

    try {
      editUserReq(values.name, values.old_password, values.password);
    } catch (e: any) {
      if (/[ㄱ-힣]/.test(e)) {
        alert(e);
      } else {
        console.log(e);
        alert("회원정보 변경을 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  }, [
    editUserReq,
    editUserRes.loading,
    values.name,
    values.old_password,
    values.password,
  ]);

  useEffect(() => {
    if (editUserRes.data && editUserRes.called) {
      setUserInfo({
        ...userInfo,
        name: values.name,
      });
      alert("회원정보 변경이 완료되었습니다.");
      onClose();
    }
  });

  return (
    <ModalBackdrop onClick={onClose}>
      {isOpen && (
        <WithdrawalModal
          onClose={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      )}
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="close_btn" onClick={onClose}>
          x
        </div>
        <StyledDiv>
          <Label>닉네임</Label>
          <InputBox
            type={"text"}
            name="name"
            onChange={handleChange}
            value={values?.name}
          />
        </StyledDiv>
        <StyledDiv>
          <Label>이메일</Label>
          <EmailBox>{userInfo?.email}</EmailBox>
        </StyledDiv>
        <StyledDiv>
          <Label>예전 비밀번호</Label>
          <InputBox
            type={"password"}
            name="old_password"
            onChange={handleChange}
          />
        </StyledDiv>
        <StyledDiv>
          <Label>비밀번호</Label>
          <InputBox type={"password"} name="password" onChange={handleChange} />
        </StyledDiv>
        <StyledDiv>
          <Label>비밀번호 확인</Label>
          <div className="warning_box">
            <InputBox
              type={"password"}
              name="checkPass"
              onChange={handleChange}
              style={{
                width: "95%",
                margin: "0 0 0 10px",
                padding: "0",
                border: "none",
              }}
            />
            <Warning
              style={
                values.password === values.checkPass || !values.checkPass
                  ? { display: "none" }
                  : {}
              }
            >
              비밀번호가 일치하지 않습니다.
            </Warning>
          </div>
        </StyledDiv>
        <BtnBox>
          <div className="button" onClick={handleSubmit}>
            완료
          </div>
          <div className="button" onClick={onClose}>
            취소
          </div>
          <div
            className="button"
            style={{ backgroundColor: "red" }}
            onClick={() => setIsOpen(true)}
          >
            회원탈퇴
          </div>
        </BtnBox>
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
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 200ms ${fadeIn} linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: 50%;
  padding: 0 0 40px 0;
  border-radius: 20px;
  > div.close_btn {
    margin-top: 10px;
    margin-left: 95%;
    width: 20px;
    font-size: 30px;
    cursor: pointer;
  }
  > div > div.button {
    border-radius: 10px;
    cursor: pointer;
    /* margin-right: 25px; */
    margin-top: 20px;
    width: 100px;
    height: 50px;
    background-color: ${theme.palette.primary};
    margin: 0 30px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 5vh;
  margin-top: 20px;
  align-items: center;
  .warning_box {
    height: 35px;
    width: 52%;
    border-bottom: 1px solid black;
    margin: 5px;
    /* padding: 5px; */
    /* padding-left: 10px; */
  }
`;

const Label = styled.div`
  font-size: 20px;
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: left;
  align-items: center;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
  height: 35px;
  width: 50%;
  margin: 5px;
  padding: 5px;
  padding-left: 10px;
`;

const EmailBox = styled.div`
  font-size: 20px;
  height: 35px;
  width: 50%;
  margin: 5px;
  padding: 10px 0 0 0;
  margin-left: 15px;
`;

const BtnBox = styled(StyledDiv)`
  display: flex;
  justify-content: right;
`;

const Warning = styled.div`
  font-size: smaller;
  margin-top: 10px;
  font-weight: bolder;
  color: red;
`;
