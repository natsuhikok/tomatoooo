import { css, Global } from "@emotion/react";
import { $defaultFontFamily } from "src/presentations/$fontFamily.style";

export const StyleRoot = () => (
  <Global styles={[$StyleRoot]} />
);

const $StyleRoot = css`
  ${$defaultFontFamily}

  *, *::before, *::after {
    box-sizing: border-box;
    line-height: 1.8;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
  * {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
      border: none;
    }
    ::-webkit-scrollbar-thumb {
      background: lightslategrey;
      border-radius: 2px;
      box-shadow: none;
    }
  }
  #__next {
    user-select: none;
  }
`