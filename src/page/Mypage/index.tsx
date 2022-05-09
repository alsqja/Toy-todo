import { SideBar } from "../../component/SideBar";
import styled from "styled-components";
import Chart from "../../component/Chart/Chart";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../store/user";
import theme from "../../styled/theme";
import { UserModal } from "../../component/UserModal/UserModal";

interface IOptions {
  name: string;
  count: number;
}

export const Mypage = () => {
  const userInfo = useRecoilValue(userSelector);
  const [options, setOptions] = useState<IOptions[]>([]);
  const [selected, setSelected] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${userInfo?.id}/data`)
      .then((res) => {
        const op = [];
        for (let key in res.data) {
          op.push({
            name: key,
            count: res.data[key],
          });
        }
        setOptions(op);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [userInfo?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <Root>
      <SideBar />
      {isOpen ? <UserModal onClose={() => setIsOpen(false)} /> : ""}
      <TodoContainer>
        <SelectContainer>
          <Selector onChange={handleChange}>
            <option value={"all"}>All</option>
            <option value={"today"}>Today</option>
          </Selector>
        </SelectContainer>
        <ChartContainer>
          <Chart
            options={
              selected === "today"
                ? options.filter((el) => el.name.includes("today"))
                : options.filter((el) => !el.name.includes("today"))
            }
          />
        </ChartContainer>
        <Btn onClick={() => setIsOpen(true)}>회원 정보 변경</Btn>
      </TodoContainer>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const TodoContainer = styled.div`
  margin-left: 10%;
  padding-top: 30px;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
`;

const SelectContainer = styled.div`
  grid-column: span 20;
  display: flex;
  justify-content: right;
`;

const Selector = styled.select`
  margin-right: 40px;
  font-size: 20px;
  padding: 10px 20px;
`;

const ChartContainer = styled.div`
  grid-column: 2 / span 18;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.div`
  grid-column: 17 / span 3;
  cursor: pointer;
  display: flex;
  background-color: ${theme.palette.primary};
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 50px;
  border-radius: 10px;
`;
