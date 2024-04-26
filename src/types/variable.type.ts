export type ThemeColor = "green" | "purple" | "dark" | "pinky";
export type ThemeVariable =
  | "primary"
  | "secondary"
  | "checkedOutline"
  | "check";

export interface Theme {
  themeId: ThemeColor;
  color: string;
  path?: string;
}

export type CSSStatus = "error" | "tint-1" | "tint-2" | "tint-3";

export interface themeVariable {
  primary: string;
}
