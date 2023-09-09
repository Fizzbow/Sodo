import { useState } from "react";
import ListGroup from "../src/components/ListGroup";
import { ItemProps } from "./components/CheckItem";
import ThemeToggle from "./components/ThemeToggle";
import { createContext } from "react";

// const mode = useColorMode({
//   attribute: "theme",
//   modes: {
//     // custom colors
//     dim: "dim",
//     cafe: "cafe",
//   },
// });

function App() {
  const ThemeContext = createContext({
    theme: "green",
    setTheme: (theme: string) => {},
  });

  const [theme, setTheme] = useState("green");

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
        <div p-6 w-full h-full className={`themed ${theme}`} bg-backdrop>
          <ThemeToggle />
          <ListGroup list={list} heading="😄Cities" onSelectItem={selectItem} />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
