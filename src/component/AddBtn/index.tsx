import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import theme from "../../styled/theme";

export const AddBtn = () => {
  return (
    <FloatingBtn>
      <FaPlus style={{ fontSize: "50px", color: `${theme.palette.grey}` }} />
    </FloatingBtn>
  );
};

const FloatingBtn = styled.div`
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 70px;
  height: 70px;
  border-radius: 80px;
  background-color: ${theme.palette.black};
  box-shadow: ${theme.palette.shadow01};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
