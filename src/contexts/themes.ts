export interface Theme {
  themeId: "green" | "purple" | "dark" | "pinky";
  color: string;
  path?: string;
}

const themes: Theme[] = [
  {
    themeId: "green",
    color: "#46834D",
  },
  { themeId: "purple", color: "#8F6DD6" },
  { themeId: "dark", color: "#23325A" },
  { themeId: "pinky", color: "#F8EDD9" },
];
export default themes;
