import { GLOBAL_VAR_STATUS, GLOBAL_VAR_THEME } from "./constant/css.constant";
import { CSSStatus, ThemeColor, ThemeVariable } from "./types";
const root = document.getElementById("root");

for (const key in GLOBAL_VAR_STATUS) {
  root?.style.setProperty(`--${key}`, GLOBAL_VAR_STATUS[key as CSSStatus]);
}

const generateThemedCss = (
  colors: Record<ThemeColor, Record<ThemeVariable, string>>
) => {
  let css = "";

  Object.keys(colors).forEach((color) => {
    const colorValues = colors[color as ThemeColor];
    const colorCss = Object.keys(colorValues)
      .map((key) => {
        return `--${key}: ${colorValues[key as ThemeVariable]};`;
      })
      .join("\n");

    css += `
      .themed.${color} {
   
        ${colorCss}
      }
    `;
  });

  return css;
};

const css = generateThemedCss(GLOBAL_VAR_THEME);

const styleTag = document.createElement("style");
styleTag.textContent = css;

document.head.appendChild(styleTag);
