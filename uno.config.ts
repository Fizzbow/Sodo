// uno.config.ts
import {
  CSSValue,
  RuleContext,
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from "unocss";

import { Theme } from "unocss/preset-mini";

import {
  GLOBAL_VAR_STATUS,
  GLOBAL_VAR_THEME,
} from "./src/constant/css.constant";

const formatColors = () => {
  const allColors = {};
  const concatColors = Object.keys(GLOBAL_VAR_STATUS).concat(
    Object.keys(GLOBAL_VAR_THEME.green)
  );
  // TODO: alpha must define (in static colors default is 100%)
  for (const color of concatColors) {
    allColors[color] = `rgba(var(--${color}) , %alpha)`;
  }

  return allColors;
};

export default defineConfig({
  shortcuts: { "transition-all-color": "transition-colors duration-300" },
  theme: {
    colors: formatColors(),
    breakpoints: {
      xxs: "0px",
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1600px",
    },
  },
  rules: [
    [
      /^text-(.*)$/,
      (match, { theme }: RuleContext<Theme>) => {
        const [, c] = match;
        if (!theme || !theme.colors) return;

        if (theme.colors[c]) {
          return {
            color: theme.colors[c],
          } as CSSValue;
        }
        return { color: undefined } as CSSValue;
      },
    ],
  ],
  safelist: [],
  presets: [
    presetUno(),
    // presetWebFonts({
    //   provider: "fontshare",
    //   fonts: {
    //     Poppins: [
    //       { name: "Poppins", weights: ["400", "500", "600", "700"] },
    //       {
    //         name: "sans-serif",
    //         provider: "none",
    //       },
    //     ],
    //     Switzer: [
    //       { name: "Switzer", weights: ["300", "400", "500", "600", "800"] },
    //       {
    //         name: "sans-serif",
    //         provider: "none",
    //       },
    //     ],
    //     Satoshi: [
    //       { name: "Satoshi", weights: ["300", "400", "500", "600", "800"] },
    //       {
    //         name: "sans-serif",
    //         provider: "none",
    //       },
    //     ],
    //   },
    // }),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
    presetTypography(),
  ],
  transformers: [transformerAttributifyJsx()],
});
