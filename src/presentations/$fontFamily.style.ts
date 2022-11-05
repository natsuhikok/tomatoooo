import { css } from "@emotion/react";

const defaultFontFamilyValue = [
  `-apple-system`,              // mac default
  `Helvetica Neue`,             // mac Latin
  `Segoe UI`, `Arial`,          // windows Latin
  `Hiragino Kaku Gothic ProN`,  // mac japanese
  `Hiragino Sans`,              // mac japanese fallback
  `BIZ UDPGothic`,              // windows japanese
  `Meiryo`,                     // windows japanese fallback
  `sans-serif`                  // fallback
].join(",");

export const $defaultFontFamily = css`
  *, *::before, *::after {
    font-family: ${defaultFontFamilyValue};
  }
`;
