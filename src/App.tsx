import { useState } from "react";
import Home from "./pages/Home";

import { createContext } from "react";
import THEMES from "./constant/themes.constant";
import ThemeToggle from "./components/ThemeToggle";
import Contact from "./components/Contact";
import { Theme } from "./types";

const stateTheme = localStorage.getItem(
  "react_todo_theme_Id"
) as Theme["themeId"];

function initFilterThemes(): Theme[] {
  if (stateTheme) {
    const filter = THEMES.filter((i) => i.themeId !== stateTheme);
    return filter;
  } else {
    return THEMES;
  }
}

function initCurrentTheme(): Theme["themeId"] {
  if (stateTheme) return stateTheme;
  return "green";
}

function App() {
  const ThemeContext = createContext({
    theme: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTheme: (_themeId: Theme["themeId"]) => {},
  });

  const [theme, setTheme] = useState(initCurrentTheme);
  const [filteredThemes, filterThemes] = useState(initFilterThemes);
  function toggleTheme(themeId: Theme["themeId"]) {
    localStorage.setItem("react_todo_theme_Id", themeId);
    setTheme(themeId);
    filterThemes(THEMES.filter((i) => i.themeId !== themeId));
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          overflow-hidden
          flex="~ col"
          className={`themed font-Switzer  font-500  p-6 w-full h-full transition-background-color-2 transition-color-2 ${theme} bg-primary`}
        >
          <ThemeToggle themes={filteredThemes} setTheme={toggleTheme} />
          <Home />
          <Contact />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
