import { useEffect, useState } from "react";

import THEMES from "./constant/themes.constant";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import { Card, Theme, THEMECOLOR } from "./types";
import { TODO_LIST } from "./constant/todo.constant";
import TodoCard from "./pages/todo/TodoCard";

const storageTodoList = localStorage.getItem(TODO_LIST);

function initTodoList(): Card {
  if (!storageTodoList) {
    return {
      title: "Title",
      card_id: "",
      list: [],
      theme: THEMECOLOR.GREEN,
    };
  }

  return JSON.parse(storageTodoList);
}

function App() {
  const [todo, setTodoList] = useState<Card>(initTodoList);

  useEffect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(todo));
  }, [todo]);

  function toggleTheme(themeId: Theme["themeId"]) {
    const newTheme = THEMES.find((i) => i.themeId === themeId)
      ?.themeId as THEMECOLOR;

    if (!newTheme) return;

    setTodoList({ ...todo, theme: newTheme });
  }

  return (
    <>
      <div
        overflow-hidden
        flex="~ col"
        className={`themed ${todo.theme} font-Switzer  font-500  p-6 w-full h-full transition-background-color-2 transition-color-2 bg-primary`}
      >
        <ThemeToggle themes={THEMES} setTheme={toggleTheme} />
        <section flex="~ row 1">
          <TodoCard
            todoList={todo}
            changeTodo={(val) => {
              setTodoList({ ...val });
            }}
          />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
