import { useState } from "react";
import styled from "styled-components";
import { ITodos } from "../../page/Total/data";
import theme from "../../styled/theme";

interface IProps {
  todo: ITodos;
}

export const TodoBox = ({ todo }: IProps) => {
  const [valuse, setValuse] = useState<ITodos>(todo);

  return (
    <StyledTodo>
      <CheckBox type={"checkbox"} />
      <ContentsBox>{valuse.contents}</ContentsBox>
      <ExpirationDateBox>
        <ExpirationDate>
          {new Date(+valuse.expiration_date).toLocaleDateString()}
        </ExpirationDate>
      </ExpirationDateBox>
    </StyledTodo>
  );
};

const StyledTodo = styled.div`
  grid-column: 2 / span 18;
  margin: 10px 0;
  height: 80px;
  border-radius: 10px;
  background-color: ${theme.palette.primary};
  display: flex;
  align-items: center;
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
`;

const ExpirationDate = styled.div`
  margin-right: 40px;
  font-size: 20px;
  color: ${theme.palette.grey2};
`;
