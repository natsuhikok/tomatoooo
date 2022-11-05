import moment, { Moment } from "moment";
import { atom, selector, useSetRecoilState } from "recoil";
import { STORAGE_KEYS } from "src/clients/appRoot/STORAGE_KEYS";
import { useInterval } from "src/clients/IndexPage/useInterval";

const currentTimeAtom = atom<Moment>({
  key: STORAGE_KEYS.CURRENT_TIME,
  default: null,
});

export const useCurrentTimeInitializer = () => {
  const setCurrentTime = useSetRecoilState(currentTimeAtom);
  function updateCurrentTime() {
    setCurrentTime(moment());
  }
  useInterval(updateCurrentTime, 100);
}

export const currentTimeSelector = {
  moment: selector<Moment>({
    key: STORAGE_KEYS.CURRENT_TIME + "/moment",
    get: ({ get }) => get(currentTimeAtom),
  }),
  formated: selector<string>({
    key: STORAGE_KEYS.CURRENT_TIME + "/formated",
    get: ({ get }) => {
      const currentTime = get(currentTimeAtom);
      return currentTime ? currentTime.format("dddd, Do MMM YYYY HH:mm") : "";
    },
  }),
}