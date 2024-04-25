import {
  ComponentsStatus,
  globalVariableStatus,
} from "./constant/css.constant";
const root = document.getElementById("root");

for (const key in globalVariableStatus) {
  root?.style.setProperty(
    `--${key}`,
    globalVariableStatus[key as ComponentsStatus]
  );
}
