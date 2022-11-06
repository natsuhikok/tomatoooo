import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { currentTimeSelector } from "src/clients/IndexPage/currentTimeAtom";
import { usePomodoroTimer } from "src/clients/IndexPage/usePomodoroTimer";

export const DisplayIndexPage: React.FC = () => {
  const currentTime = useRecoilValue(currentTimeSelector.formated);
  const pomodoro = usePomodoroTimer();
  return (
    <div css={$style}>
      <div>
        {currentTime}
      </div>
      {/* <div>
        {displayMessage(pomodoro.secondsToEnd, pomodoro.isInitial)}
      </div> */}
      <div>
        {!pomodoro.isInitial && (
          <>
            {dispayTimeToEnd(pomodoro.secondsToEnd)}
            {pomodoro.isExceed && <span> ago</span>}
          </>
        )}
      </div>
      <button
        data-is-running={pomodoro.isRunning}
        onClick={pomodoro.createStartTimerHandler(25 * 60)}
      >
        {pomodoro.isRunning ? "Reset" : "Start"}
      </button>
    </div>
  )
}

function dispayTimeToEnd(secondsToEnd: number) {
  const SecondsAbs = Math.abs(secondsToEnd);
  const minutes = Math.floor(SecondsAbs / 60);
  const seconds = SecondsAbs % 60;
  if (minutes === 0) return `${seconds < 10 ? `0${seconds}` : seconds} seconds`;
  return `${minutes} minutes ${seconds < 10 ? `0${seconds}` : seconds} seconds`;
};

function displayMessage(secondsToEnd: number, isInitial: boolean) {
  if (isInitial) return "Just do it!";
  if (secondsToEnd < (-1 * 5 * 60)) return "Just do it!";
  if (secondsToEnd <= 0) return "Time is up!";
  const minutes = Math.floor(secondsToEnd / 60);
  if (minutes === 0) return "Time is almost up!";
  return "Keep going!";
}

const $style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  & > div {
    color: #ffffffe1;
    text-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    font-weight: bold;
  }
  & > div:first-of-type {
    font-size: 14px;
    text-align: center;
    background-image: linear-gradient(to top right, #d96782, #e07a5f);
    padding: 6px 12px;
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 2px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  & > div:nth-of-type(2) {
    font-size: 32px;
    line-height: 1;
  }

  & > div:last-of-type {
    font-size: 22px;
    line-height: 1;
    margin-top: 8px;
    & > span {
      font-size: 22px;
      line-height: 1;
    }
  }
  & > button {
    margin-top: 22px;
    background-color: #0071b7;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: none;
    padding: 6px 62px;
    color: #ffffffe1;
    border-radius: 4px;
    font-size: 18px;
    margin-bottom: -20px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #7d6bb8;
    }
    &[data-is-running="true"] {
      background-color: #d96782;
      &:hover {
        background-color: #e07a5f;
      }
    }
  }
`;