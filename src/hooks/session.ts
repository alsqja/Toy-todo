import { useSetRecoilState } from "recoil";
import { userSelector, userState } from "../store/user";
import { useAxios } from "./axios";

export const useLogout = () => {
  const setUserInfo = useSetRecoilState(userState);
  const setUser = useSetRecoilState(userSelector);

  const logout = () => {
    setUser(null);
    setUserInfo(null);
  };

  return logout;
};

export const useLogin = () => {
  const [request, response] = useAxios();

  const run = (email: string, password: string) => {
    return request({
      url: "/signin",
      method: "POST",
      data: { email, password },
    });
  };

  return [run, response] as [typeof run, typeof response];
};
