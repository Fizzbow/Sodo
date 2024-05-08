import { useEffect } from "react";

import THEMES from "./constant/themes.constant";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import { Action, Card, Item, Theme, THEMECOLOR } from "./types";
import { INIT_TODO_CARD, TODO_LIST } from "./constant/todo.constant";
import TodoCard from "./pages/todo/TodoCard";
import todoReducer, { CardAction } from "./utils/todoReducer";
import { useImmerReducer } from "use-immer";

const storageTodoList = localStorage.getItem(TODO_LIST);

function initTodoList(): Card {
  if (!storageTodoList) {
    return INIT_TODO_CARD;
  }

  return JSON.parse(storageTodoList);
}

function App() {
  const [todo, dispatch] = useImmerReducer<Card, CardAction>(
    todoReducer,
    initTodoList()
  );

  useEffect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(todo));
  }, [todo]);

  function toggleTheme(themeId: Theme["themeId"]) {
    const newTheme = THEMES.find((i) => i.themeId === themeId)
      ?.themeId as THEMECOLOR;

    if (!newTheme) return;

    dispatch({ theme: newTheme, type: Action.CHANGE_THEME });
  }

  function handleAddList(text: string) {
    dispatch({
      text,
      type: Action.ADD_TO_LIST,
    });
  }
  function handleDeleteList(id: string) {
    dispatch({
      type: Action.DELETE,
      id,
    });
  }
  function handleChangeItem(item: Item) {
    dispatch({
      type: Action.CHANGE_ITEM,
      ...item,
    });
  }
  function handleChangeList(card: Card) {
    dispatch({
      type: Action.RESET_CARD,
      card,
    });
  }

  return (
    <>
      <div
        overflow-hidden
        flex="~ col"
        className={`themed ${todo.theme} font-Switzer  font-500  p-6 w-full h-full transition-background-color-2 transition-color-2 bg-primary`}
      >
        <ThemeToggle themes={THEMES} setTheme={toggleTheme} />

        <TodoCard
          todoList={todo}
          onChangeListOrder={(card) => handleChangeList(card)}
          onDeleteItem={(id) => handleDeleteList(id)}
          onAddItem={(text) => handleAddList(text)}
          onChangeItem={(item) => handleChangeItem(item)}
        />

        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
