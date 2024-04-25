export type ThemeColor = "green" | "purple" | "dark" | "pinky";
export interface Theme {
  themeId: ThemeColor;
  color: string;
  path?: string;
}

export type CSSStatus = "error";

export interface themeVariable {
  primary: string;
}
