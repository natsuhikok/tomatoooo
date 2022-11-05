import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { STORAGE_KEYS } from "src/clients/appRoot/STORAGE_KEYS";
import { currentTimeSelector } from "src/clients/IndexPage/currentTimeAtom";

export function usePomodoroTimer() {
  const currentTime = useRecoilValue(currentTimeSelector.moment);
  const [timeSeconds, setTimeSeconds] = useTimerSeconds();
  const [startAt, setStartAt] = usePomodoroStartAt();
  const [notified, setNotified] = useState(false);
  const isInitial = startAt === null;
  const secondsToEnd = useMemo(() => {
    if (startAt == null || currentTime == null) return 0;
    const secondsFromStart = currentTime.diff(startAt, "seconds");
    return timeSeconds - secondsFromStart;
  }, [currentTime, startAt, timeSeconds]);

  const canPlaySound = (
    !isInitial &&
    secondsToEnd <= 0 &&
    secondsToEnd > -1 * 60 * 5 &&
    !notified
  )

  useEffect(() => {
    if (!canPlaySound) return;
    const audio = new Audio("./ta-dah.mp3");
    audio.volume = 0.3;
    console.log("played");
    setNotified(true);
    audio.play();
  }, [secondsToEnd]);

  function createStartTimerHandler(timeSeconds: number) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTimeSeconds(timeSeconds);
      setNotified(false);
      setStartAt(moment());
    }
  }

  return {
    createStartTimerHandler,
    secondsToEnd,
    isInitial,
    isExceed: secondsToEnd < 0,
    isRunning: !isInitial && secondsToEnd > 0,
  }
}

function useTimerSeconds() {
  const [timerSeconds, _setTimerSeconds] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POMODORO_TIMER);
    saved && _setTimerSeconds(Number(saved));
  }, []);
  function setTimerSeconds(value: number) {
    _setTimerSeconds(value);
    localStorage.setItem(STORAGE_KEYS.POMODORO_TIMER, `${value}`);
  }
  return [timerSeconds, setTimerSeconds] as const;
}

function usePomodoroStartAt() {
  const [startAt, _setStartAt] = useState<Moment>(null);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POMODORO_START_AT);
    _setStartAt(saved ? moment(saved) : null);
  }, []);
  function setStartAt(value: Moment) {
    _setStartAt(value);
    localStorage.setItem(STORAGE_KEYS.POMODORO_START_AT, value.format());
  }
  return [startAt, setStartAt] as const;
}