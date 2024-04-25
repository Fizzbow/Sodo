import { GLOBAL_VAR_STATUS } from "./constant/css.constant";
import { CSSStatus } from "./types";
const root = document.getElementById("root");

for (const key in GLOBAL_VAR_STATUS) {
  root?.style.setProperty(`--${key}`, GLOBAL_VAR_STATUS[key as CSSStatus]);
}
