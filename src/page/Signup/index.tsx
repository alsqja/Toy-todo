import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSignup } from "../../hooks/session";
import theme from "../../styled/theme";
import { ISignUpValues } from "./index.d";

export const Signup = () => {
  const [values, setValues] = useState<ISignUpValues>({
    email: "",
    password: "",
    name: "",
    checkpass: "",
  });
  const [isCheck, setIsCheck] = useState(true);
  const [register, { called, data, loading }] = useSignup();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      let value = e.target.value;

      if (name === "checkpass") {
        if (value !== values.password) {
          setIsCheck(false);
        } else if (value === values.password || value.length === 0) {
          setIsCheck(true);
        }
      }

      setValues({
        ...values,
        [name]: value,
      });
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.checkpass
    ) {
      alert("필수 정보를 입력해주세요.");
      return;
    }
    if (loading) return;

    try {
      await register(values.name, values.email, values.password);
    } catch (e: any) {
      if (/[ㄱ-힣]/.test(e)) {
        alert(e);
      } else {
        alert("로그인을 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  }, [
    loading,
    register,
    values.checkpass,
    values.email,
    values.name,
    values.password,
  ]);

  useEffect(() => {
    if (called && data) {
      navigate("/signin");
    }
  }, [called, navigate, data]);

  return (
    <SignupContainer>
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="닉네임"
              value={values.name}
              name="name"
              onChange={handleChange}
            />
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="이메일"
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            {/* <VerifyButton>인증하기</VerifyButton> */}
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 확인 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={values.checkpass}
              name="checkpass"
              onChange={handleChange}
            />
            <Warning style={isCheck ? { display: "none" } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          <StyledButton
            onClick={() => {
              navigate("/");
            }}
          >
            뒤로
          </StyledButton>
          <StyledButton onClick={handleSubmit}>회원가입</StyledButton>
        </ButtonBox>
      </Body>
    </SignupContainer>
  );
};

const SignupContainer = styled.div``;

const Body = styled.div`
  margin: 20vh 0;
  height: 100%;
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  margin-top: 5vh;
`;

const KeyInput = styled.div`
  font-size: 18px;
  padding-left: 160px;
  width: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

const InputBox = styled.div`
  width: 360px;
`;

const ValueInput = styled.input`
  border: none;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 13px;
  font-size: 17px;
  height: 40px;
  width: 230px;
  padding: 5px;
`;

const Warning = styled.div`
  font-size: smaller;
  font-weight: bolder;
  color: red;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  &:hover {
    background: ${theme.palette.primaryLighter};
  }
  box-shadow: ${theme.palette.shadow01};
  border: none;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  background: ${theme.palette.primary};
  width: 100px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  color: white;
`;
