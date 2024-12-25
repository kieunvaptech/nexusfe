import { atom, selector } from 'recoil';

const defaultData = {}

export const userInfoState = atom({
  key: 'userInfoState',
  default: defaultData,
});

export const userInfoData = selector({
  key: 'userInfoData',
  get: ({ get }) => {
    const data = get(userInfoState);
    return data;
  },
});