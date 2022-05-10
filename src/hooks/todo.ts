import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "../store/user";
import { useAxios } from "./axios";

export const useTodoList = () => {
  const user_id = useRecoilValue(userSelector);
  const [request, response] = useAxios();
  const navigate = useNavigate();

  if (!user_id) {
    navigate("/signin");
  }

  const run = useCallback(
    (params: any) => {
      return request({
        url: `/todo/user/${user_id}`,
        method: "GET",
        params: {
          ...params,
        },
      });
    },
    [request, user_id]
  );

  return [run, response] as [typeof run, typeof response];
};
