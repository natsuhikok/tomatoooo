import { DependencyList, useEffect, useRef } from "react";
import moment, { Moment } from "moment";
import { atom, selector, useSetRecoilState } from "recoil";
import { STORAGE_KEYS } from "src/clients/appRoot/STORAGE_KEYS";

const _currentTimeAtom = atom<Moment>({
  key: STORAGE_KEYS.CURRENT_TIME,
  default: null,
});

export const useCurrentTimeInitializer = () => {
  const setCurrentTime = useSetRecoilState(_currentTimeAtom);
  function updateCurrentTime() {
    setCurrentTime(moment());
  }
  useInterval(updateCurrentTime, 100);
}

export const currentTimeSelector = {
  moment: selector<Moment>({
    key: STORAGE_KEYS.CURRENT_TIME + "/moment",
    get: ({ get }) => get(_currentTimeAtom),
  }),
  formated: selector<string>({
    key: STORAGE_KEYS.CURRENT_TIME + "/formated",
    get: ({ get }) => {
      const currentTime = get(_currentTimeAtom);
      return currentTime ? currentTime.format("dddd, Do MMM YYYY HH:mm") : "";
    },
  }),
}

function useInterval(
  callback: () => void, interval: number, dependencies: DependencyList = []
) {
  const intervalRef = useRef<NodeJS.Timer>();
  useEffect(() => {
    intervalRef.current = setInterval(callback, interval);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, dependencies);
}