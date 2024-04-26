// import { ThemeColor } from "./themes.constant";

import { CSSStatus, ThemeColor, ThemeVariable } from "../types";

export const GLOBAL_VAR_STATUS: Record<CSSStatus, string> = {
  error: "248,113,113",
  "tint-1": "255, 255, 255",
  "tint-2": "187, 185, 185",
  "tint-3": "138, 138, 138",
};

export const GLOBAL_VAR_THEME: Record<
  ThemeColor,
  Record<ThemeVariable, string>
> = {
  green: {
    primary: "70, 131, 77",
    secondary: "250, 255, 192",
    checkedOutline: "171, 206, 175",
    check: "70, 131, 77",
  },
  purple: {
    primary: "143, 109, 214",
    secondary: "238, 232, 216",
    checkedOutline: "215, 210, 216",
    check: "143, 109, 214",
  },
  dark: {
    primary: "35, 50, 90",
    secondary: "230, 166, 113",
    checkedOutline: "239, 224, 212",
    check: " 230, 166, 113",
  },
  pinky: {
    primary: "248, 237, 217",
    secondary: "70, 131, 77",
    checkedOutline: "171, 206, 175",
    check: "70, 131, 77",
  },
};