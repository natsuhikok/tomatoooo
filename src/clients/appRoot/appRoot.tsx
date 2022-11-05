import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { StyleRoot } from "src/presentations/$styleRoot";

export const AppRoot: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <StyleRoot />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}