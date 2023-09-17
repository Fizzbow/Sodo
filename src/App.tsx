import { useState } from "react";
import Home from "./pages/Home";

import { createContext } from "react";
import themes, { Theme } from "./contexts/themes";
import ThemeToggle from "./components/ThemeToggle";
import Contact from "./components/Contact";

const stateTheme = localStorage.getItem(
  "react_todo_theme_Id"
) as Theme["themeId"];

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTheme: (_themeId: Theme["themeId"]) => {},
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
          flex="~ col"
          className={`themed  p-6 w-full h-full transition-background-color-2 transition-color-2 ${theme} bg-backdrop`}
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
