export enum THEMECOLOR {
  GREEN = "green",
  PURPLE = "purple",
  DARK = "dark",
  PINKY = "pinky",
}
export type ThemeVariable =
  | "primary"
  | "secondary"
  | "checkedOutline"
  | "check";

export interface Theme {
  themeId: THEMECOLOR;
  color: string;
  path?: string;
}

export type CSSStatus = "error" | "tint-1" | "tint-2" | "tint-3";
