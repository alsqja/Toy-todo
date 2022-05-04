import { atom, DefaultValue, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const { persistAtom } = recoilPersist();

interface IUser {
  id: number;
  email: string;
  name: string;
}

const userState = atom<IUser | null>({
  default: null,
  key: "user/info",
  effects_UNSTABLE: [persistAtom],
} as any);

export const userSelector = selector<IUser | null>({
  get: ({ get }) => get(userState),
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) {
      reset(userState);
    } else {
      set(userState, newValue);
    }
  },
  key: "user/selector",
});
