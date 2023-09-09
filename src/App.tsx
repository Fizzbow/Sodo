import { useState } from "react";
import ListGroup from "../src/components/ListGroup";
import { ItemProps } from "./components/CheckItem";
import ThemeToggle from "./components/ThemeToggle";
import { createContext } from "react";
import themes, { Theme } from "./contexts/themes";

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

  const list: Array<ItemProps> = [
    { text: "an item", caption: "captions" },
    { text: "items", caption: "captions" },
    { text: "new york", caption: "captions" },
  ];

  const selectItem = (item: string) => {
    console.log({ item });
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          p-6
          w-full
          h-full
          className={`themed transition-background-color-2 transition-color-2 ${theme} bg-backdrop`}
        >
          <ThemeToggle themes={filteredThemes} setTheme={toggleTheme} />
          <ListGroup list={list} heading="😄Cities" onSelectItem={selectItem} />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
