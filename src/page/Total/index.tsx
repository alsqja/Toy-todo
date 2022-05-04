import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { SideBar } from "../../component/SideBar";
import { userSelector } from "../../store/user";

export const TotalTodos = () => {
  const userInfo = useRecoilValue(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  return (
    <Root>
      <SideBar />
      <div>asdasdasd</div>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  margin-top: 50px;
`;
