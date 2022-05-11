import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import { usePostTodo } from "../../hooks/todo";
import theme from "../../styled/theme";
import { todayMaker } from "../function/time";

interface IProps {
  onClose: () => void;
  setReLoad?: Dispatch<SetStateAction<boolean>>;
}

interface ITodoValues {
  contents: string;
  expiration_date: string;
}

export const CreateTodoModal = ({ onClose, setReLoad }: IProps) => {
  const [values, setValues] = useState<ITodoValues>({
    contents: "",
    expiration_date: "",
  });
  const [request, { called, data, loading }] = usePostTodo();

  useEffect(() => {
    const modalESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keyup", modalESC);
    return () => {
      document.removeEventListener("keyup", modalESC);
    };
  }, [onClose]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      let value = e.target.value;

      if (name === "expiration_date") {
        value = new Date(value).getTime().toString();
        if (+value < +new Date(todayMaker()).getTime()) {
          alert("마감일은 오늘 이후로 설정할 수 있습니다.");
          setValues({
            ...values,
            expiration_date: "",
          });
          return;
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
    if (loading) {
      return;
    }
    if (values.contents === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (values.contents === "") {
      alert("마감일을 설정해주세요.");
      return;
    }
    if (+values.expiration_date < +new Date(todayMaker()).getTime()) {
      alert("마감일은 오늘 이후로 설정할 수 있습니다.");
      return;
    }

    try {
      await request(values.contents, values.expiration_date);
    } catch (e) {
      console.log(e);
    }
  }, [loading, request, values.contents, values.expiration_date]);

  useEffect(() => {
    if (data && called) {
      window.location.reload();
    }
  }, [called, data, onClose, setReLoad]);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="close_btn" onClick={onClose}>
          x
        </div>
        <StyledDiv>
          <Label>내용</Label>
          <InputBox type={"text"} name="contents" onChange={handleChange} />
        </StyledDiv>
        <StyledDiv>
          <Label>날짜</Label>
          <InputBox
            type={"date"}
            name="expiration_date"
            onChange={handleChange}
          />
        </StyledDiv>
        <BtnBox>
          <div className="button" onClick={handleSubmit}>
            완료
          </div>
          <div className="button" onClick={onClose}>
            취소
          </div>
        </BtnBox>
      </ModalView>
    </ModalBackdrop>
  );
};

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 200ms ${fadeIn} linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: 50%;
  padding: 0 0 40px 0;
  border-radius: 20px;
  > div.close_btn {
    margin-top: 10px;
    margin-left: 95%;
    width: 20px;
    font-size: 30px;
    cursor: pointer;
  }
  > div > div.button {
    border-radius: 10px;
    cursor: pointer;
    /* margin-right: 25px; */
    margin-top: 20px;
    width: 100px;
    height: 50px;
    background-color: ${theme.palette.primary};
    margin: 0 30px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  height: 5vh;
  margin-top: 20px;
  align-items: center;
`;

const Label = styled.div`
  font-size: 20px;
  display: flex;
  height: 100%;
  justify-content: left;
  align-items: center;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid black;
  font-size: 14px;
  height: 35px;
  width: 80%;
  margin: 5px;
  padding: 5px;
  padding-left: 10px;
`;

const BtnBox = styled(StyledDiv)`
  display: flex;
  justify-content: right;
`;
