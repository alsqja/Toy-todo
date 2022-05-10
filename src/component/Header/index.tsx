import styled from "styled-components";
import theme from "../../styled/theme";
import { FaUserCircle } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userSelector, userState } from "../../store/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setUser = useSetRecoilState(userSelector);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <HeaderOuter>
      <Logo>TODO LIST</Logo>
      <IconBox
        style={!userInfo ? { display: "none" } : {}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUserCircle
          style={{ color: `${theme.palette.blackLighter}`, fontSize: "30px" }}
        />
        <NameBox>{userInfo?.name}</NameBox>
      </IconBox>
      {isOpen && (
        <UserModal>
          <div
            onClick={() => {
              navigate("/mypage");
              setIsOpen(false);
            }}
          >
            마이페이지
          </div>
          <div
            onClick={() => {
              setUserInfo(null);
              setUser(null);
              setIsOpen(false);
            }}
          >
            로그아웃
          </div>
        </UserModal>
      )}
    </HeaderOuter>
  );
};

const HeaderOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: ${theme.palette.shadow01};
  background-color: #fff;
`;

const Logo = styled.div`
  width: 200px;
  height: 70%;
  display: flex;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${theme.palette.primary};
`;

const IconBox = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NameBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${theme.palette.blackLighter};
  margin-left: 10px;
  font-size: 25px;
`;

const UserModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  right: 30px;
  width: 140px;
  padding: 10px 0px;
  background-color: #fff;
  box-shadow: ${theme.palette.shadow01};
  border-top: 2px solid ${theme.palette.primary};
  div {
    padding: 10px 5px;
    margin: 5px 0;
    cursor: pointer;
    border-bottom: 1px solid #dbdbdb;
  }
`;
