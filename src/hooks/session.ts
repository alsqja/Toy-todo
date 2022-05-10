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
      url: "/auth/signin",
      method: "POST",
      data: { email, password },
    });
  };

  return [run, response] as [typeof run, typeof response];
};

export const useSignup = () => {
  const [request, response] = useAxios();

  const run = (name: string, email: string, password: string) => {
    return request({
      url: "/auth/signup",
      method: "POST",
      data: { name, email, password },
    });
  };

  return [run, response] as [typeof run, typeof response];
};
