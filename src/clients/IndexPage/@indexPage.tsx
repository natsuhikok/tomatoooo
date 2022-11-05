import { css } from "@emotion/react";
import Head from "next/head";
import { useCurrentTimeInitializer } from "src/clients/IndexPage/currentTimeAtom";
import { DisplayIndexPage } from "src/clients/IndexPage/displayIndexPage";
import { COLOR } from "src/presentations/COLOR";

export const IndexPage: React.FC = () => {
  usePageIntializer();
  return (
    <>
      <Head>
        <title>Dailyboard</title>
      </Head>
      <div css={$container}>
        <DisplayIndexPage />
      </div>
    </>
  )
}

function usePageIntializer() {
  useCurrentTimeInitializer();
}

const $container = css`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right top, ${COLOR.gradient});
`