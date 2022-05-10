import styled, { keyframes } from "styled-components";
import { FaRedoAlt } from "react-icons/fa";

export const Spinner = () => {
  return (
    <Container>
      LOADING...
      <Spin>
        <FaRedoAlt />
      </Spin>
    </Container>
  );
};

const Container = styled.div`
  grid-column: span 20;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Spin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  animation: 2s ${spinning} linear infinite;
  font-size: 50px;
`;
