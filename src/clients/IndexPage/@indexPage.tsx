import { css } from "@emotion/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { currentTimeSelector, useCurrentTimeInitializer } from "src/clients/IndexPage/currentTimeAtom";
import { EmojiFavicon } from "src/clients/IndexPage/emojiFavicon";
import { usePomodoroTimer } from "src/clients/IndexPage/usePomodoroTimer";
import { COLOR } from "src/presentations/COLOR";

export const IndexPage: React.FC = () => {
  const currentTime = useRecoilValue(currentTimeSelector.formated);
  const pomodoro = usePomodoroTimer();
  usePageIntializer();
  return (
    <>
      <Head>
        <title>🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅</title>
        <EmojiFavicon emoji={"🍅"} />
      </Head>
      <div css={$indexPage}>
        <aside css={$currentTime}>{currentTime}</aside>
        <main css={$pomodoro}>
          {!pomodoro.isInitial && (
            <p>
              {dispayTimeToEnd(pomodoro.secondsToEnd)}
              {pomodoro.isExceed && <span> ago</span>}
            </p>
          )}
          <button
            data-is-running={pomodoro.isRunning}
            onClick={pomodoro.createStartTimerHandler(25 * 60)}
          >
            {pomodoro.isRunning ? "Reset" : "Start"}
          </button>
        </main>
      </div>
    </>
  )
}

function usePageIntializer() {
  useCurrentTimeInitializer();
}

function dispayTimeToEnd(secondsToEnd: number) {
  const SecondsAbs = Math.abs(secondsToEnd);
  const minutes = Math.floor(SecondsAbs / 60);
  const seconds = SecondsAbs % 60;
  if (minutes === 0) return `${seconds < 10 ? `0${seconds}` : seconds} seconds`;
  return `${minutes} minutes ${seconds < 10 ? `0${seconds}` : seconds} seconds`;
};

const $indexPage = css`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right top, ${COLOR.gradient});
`

const $currentTime = css`
    position: absolute;
    top: 4px;
    right: 4px;

    color: #ffffffe1;
    font-weight: bold;
    font-size: 14px;

    text-align: center;
    background-image: linear-gradient(to top right, #d96782, #e07a5f);
    padding: 6px 12px;
    border-radius: 2px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const $pomodoro = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  width: 100%;
  & > p {
    text-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: #ffffffe1;
    font-size: 32px;
    line-height: 1;
    & > span {
      font-size: inherit;
    }
  }
  & > button {
    margin-top: 16px;
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
`