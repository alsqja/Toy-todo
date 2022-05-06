import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styled/theme";
import { menus } from "./data";

export const SideBar = () => {
  const click = useRef<string>(window.location.pathname);

  return (
    <Container>
      <BtnBox>
        {menus.map((menu) => {
          return (
            <Btn
              key={menu.id}
              style={
                click.current === menu.link
                  ? { backgroundColor: `${theme.palette.blackLight}` }
                  : {}
              }
              to={menu.link}
            >
              {menu.id}
            </Btn>
          );
        })}
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  float: left;
  position: fixed;
  width: 10%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  box-shadow: ${theme.palette.shadow01};
`;

const BtnBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Btn = styled(NavLink)`
  cursor: pointer;
  border-radius: 10px;
  background-color: ${theme.palette.primary};
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
  font-size: 25px;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${theme.palette.primaryLight};
  }
  box-shadow: ${theme.palette.shadow01};
`;
