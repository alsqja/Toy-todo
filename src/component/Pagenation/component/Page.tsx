import { Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";
import theme from "../../../styled/theme";

interface IProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isCurrent: boolean;
}

export const Page = ({ page, setPage, isCurrent }: IProps) => {
  const handleClick = useCallback(() => {
    setPage(page);
  }, [page, setPage]);

  return (
    <Container
      onClick={handleClick}
      style={
        isCurrent
          ? { backgroundColor: `${theme.palette.primary}` }
          : { fontWeight: "lighter" }
      }
    >
      {page}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-size: 25px;
  font-weight: bold;
  margin: 0 5px;
  cursor: pointer;
`;
