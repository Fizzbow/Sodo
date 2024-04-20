// uno.config.ts
import {
  CSSValue,
  RuleContext,
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerAttributifyJsx,
} from "unocss";
import { Theme } from "unocss/preset-mini";

export default defineConfig({
  theme: {
    colors: {
      backdrop: "rgba(var(--backdrop) , %alpha)",
      word: "rgba(var(--word) , %alpha)",
      tint: {
        1: "rgba(var(--tint-1) , %alpha)",
        2: "rgba(var(--tint-2) , %alpha)",
        3: "rgba(var(--tint-3) , %alpha)",
      },
      check: "rgba(var(--check), %alpha)",
    },
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
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        Poppins: [
          { name: "Poppins", weights: ["400", "500", "600", "700"] },
          {
            name: "sans-serif",
            provider: "none",
          },
        ],
        Switzer: [
          { name: "Switzer", weights: ["300", "400", "500", "600", "800"] },
          {
            name: "sans-serif",
            provider: "none",
          },
        ],
      },
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
    presetTypography(),
  ],
  transformers: [transformerAttributifyJsx()],
});
