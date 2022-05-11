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

export const usePostTodo = () => {
  const user_id = useRecoilValue(userSelector);
  const [request, response] = useAxios();

  const run = useCallback(
    (contents: string, expiration_date: string) => {
      return request({
        url: `/todo/user/${user_id}`,
        method: "POST",
        data: {
          contents,
          expiration_date,
        },
      });
    },
    [request, user_id]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useEditTodo = () => {
  const user_id = useRecoilValue(userSelector);
  const [request, response] = useAxios();

  const run = useCallback(
    (
      id: number,
      contents: string,
      expiration_date: string,
      is_done: boolean
    ) => {
      return request({
        url: `/todo/${id}/user/${user_id}`,
        method: "PUT",
        data: {
          contents,
          expiration_date,
          is_done,
        },
      });
    },
    [request, user_id]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useDeleteTodo = () => {
  const user_id = useRecoilValue(userSelector);
  const [request, response] = useAxios();

  const run = useCallback(
    (id: number) => {
      return request({
        url: `/todo/${id}/user/${user_id}`,
        method: "DELETE",
      });
    },
    [request, user_id]
  );

  return [run, response] as [typeof run, typeof response];
};
