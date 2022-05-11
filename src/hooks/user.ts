import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userSelector } from "../store/user";
import { useAxios } from "./axios";

export const useUserData = () => {
  const [request, response] = useAxios();
  const user_id = useRecoilValue(userSelector);
  const navigate = useNavigate();

  if (!user_id) {
    navigate("/signin");
  }

  const run = useCallback(() => {
    return request({
      url: `/user/${user_id}/data`,
      method: "GET",
    });
  }, [request, user_id]);

  return [run, response] as [typeof run, typeof response];
};

export const useUser = () => {
  const [request, response] = useAxios();
  const user_id = useRecoilValue(userSelector);

  const run = useCallback(() => {
    return request({
      url: `/user/${user_id}`,
      method: "GET",
    });
  }, [request, user_id]);

  return [run, response] as [typeof run, typeof response];
};

export const useEditUser = () => {
  const [request, response] = useAxios();
  const user_id = useRecoilValue(userSelector);

  const run = useCallback(
    (name: string, old_password: string, password: string) => {
      return request({
        url: `/user/${user_id}`,
        method: "PUT",
        data: {
          name,
          old_password,
          password,
        },
      });
    },
    [request, user_id]
  );

  return [run, response] as [typeof run, typeof response];
};

export const useDeleteUser = () => {
  const [request, response] = useAxios();
  const user_id = useRecoilValue(userSelector);

  const run = useCallback(() => {
    return request({
      url: `/user/${user_id}`,
      method: "DELETE",
    });
  }, [request, user_id]);

  return [run, response] as [typeof run, typeof response];
};
