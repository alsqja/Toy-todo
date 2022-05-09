import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { Page } from "./component/Page";

interface IProps {
  pageNum: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const PageNation = ({ pageNum, page, setPage }: IProps) => {
  const [pageArr, setPageArr] = useState<number[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < pageNum; i++) {
      arr.push(i + 1);
    }
    setPageArr([...arr]);
  }, [pageNum]);

  return (
    <Container>
      {pageArr.map((el) => (
        <Page key={el} page={el} setPage={setPage} isCurrent={page === el} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 80%;
  bottom: 20px; // 제외 시 페이지 버튼 박스 위치 고정 x
  margin: 10px 15%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
