import { useState } from "react";
import Home from "./pages/Home";

import { createContext } from "react";
import themes, { Theme } from "./contexts/themes";
import ThemeToggle from "./components/ThemeToggle";

const stateTheme: Theme["themeId"] = localStorage.getItem(
  "react_todo_theme_Id"
);

function initFilterThemes(): Theme[] {
  if (stateTheme) {
    const filter = themes.filter((i) => i.themeId !== stateTheme);
    return filter;
  } else {
    return themes;
  }
}

function initCurrentTheme(): Theme["themeId"] {
  if (stateTheme) return stateTheme;
  return "green";
}

function App() {
  const ThemeContext = createContext({
    theme: "",
    setTheme: (themeId: Theme["themeId"]) => {},
  });

  const [theme, setTheme] = useState(initCurrentTheme);
  const [filteredThemes, filterThemes] = useState(initFilterThemes);
  function toggleTheme(themeId: Theme["themeId"]) {
    localStorage.setItem("react_todo_theme_Id", themeId);
    setTheme(themeId);
    filterThemes(themes.filter((i) => i.themeId !== themeId));
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          overflow-auto
          className={`themed p-6 w-full h-full transition-background-color-2 transition-color-2 ${theme} bg-backdrop`}
        >
          <ThemeToggle themes={filteredThemes} setTheme={toggleTheme} />
          <Home />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
