// import { ThemeColor } from "./themes.constant";

export type ComponentsStatus = "error";
export const globalVariableStatus: Record<ComponentsStatus, string> = {
  error: "248,113,113",
};

export interface themeVariable {
  primary: string;
}

// export const globalVariableTheme: Record<ThemeColor, themeVariable> = {
//     green: {
//         primary: "1,2,10",
//     },
//     purple: undefined,
//     dark: undefined,
//     pinky: undefined
// };
