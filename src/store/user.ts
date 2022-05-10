import { atom, DefaultValue, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const { persistAtom } = recoilPersist();

interface IUser {
  id: number;
}

interface IUserInfo {
  id?: number;
  email?: string;
  name?: string;
}

const tokenState = atom<IUser | null>({
  default: null,
  key: "user/info",
  effects_UNSTABLE: [persistAtom],
} as any);

export const userSelector = selector<IUser | null>({
  get: ({ get }) => get(tokenState),
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) {
      reset(tokenState);
    } else {
      set(tokenState, newValue);
    }
  },
  key: "user/selector",
});

export const userState = atom<IUserInfo | null>({
  default: null,
  key: "user/user",
  effects_UNSTABLE: [persistAtom],
});
