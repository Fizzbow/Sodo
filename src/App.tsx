import { useState } from "react";

import THEMES from "./constant/themes.constant";
import { Action, Card, Item, THEMECOLOR } from "./types";

import TodoCard from "./pages/todo/TodoCard";

import SideBar from "./components/SideBar";
import { useTodoStore } from "./store/db";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cards, currentId, dispatchToCard, createCard } = useTodoStore();

  const current = cards[currentId ?? "default"];

  function toggleTheme(themeId: string) {
    if (!current) return;
    const theme = THEMES.find((t) => t.themeId === themeId);
    if (theme)
      dispatchToCard(current.card_id, {
        type: Action.CHANGE_THEME,
        theme: theme.themeId as THEMECOLOR,
      });
  }

  function handleAddList(text: string) {
    if (!current) return;
    dispatchToCard(current.card_id, { type: Action.ADD_TO_LIST, text });
  }

  function handleDeleteList(id: string) {
    if (!current) return;
    dispatchToCard(current.card_id, { type: Action.DELETE, id });
  }

  function handleChangeItem(item: Item) {
    if (!current) return;
    dispatchToCard(current.card_id, { type: Action.CHANGE_ITEM, ...item });
  }

  function handleChangeList(card: Card) {
    if (!current) return;
    dispatchToCard(current.card_id, { type: Action.RESET_CARD, card });
  }

  return (
    <div className="flex h-screen w-full">
      <SideBar
        isOpen={isSidebarOpen}
        className="backdrop-blur-md bg-white/20 border border-white/30 flex flex-col"
      >
        <div className="flex items-center flex-1 flex-col gap-2">
          {Object.keys(cards).map((key) => (
            <div
              className="cursor-pointer bg-gray-200/50 p-2 rounded-xl flex items-center justify-between w-full"
              key={key}
            >
              <span>{cards[key].title}</span>
            </div>
          ))}
        </div>
        <div
          onClick={() => createCard("new list")}
          className="cursor-pointer  p-2 rounded-xl flex items-center justify-between w-full"
        >
          add new list
        </div>
      </SideBar>

      <div
        overflow-hidden
        flex="~ col"
        className={`themed ${current?.theme} font-Poppins  font-500  px-6 w-full h-full transition-background-color-2 transition-color-2 bg-primary`}
      >
        <header className="py-5" flex="~ row items-center justify-center">
          <div
            className="i-mynaui:sidebar-alt text-7 text-secondary/100 absolute left-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div flex="~ row items-center justify-center">
            {THEMES.map((theme) => (
              <div
                key={theme.themeId}
                style={{
                  background: theme.color,
                }}
                onClick={() => toggleTheme(theme.themeId)}
                className="w-3 h-3 rounded-[50%] mx-1 cursor-pointer shadow-tint-3/100 shadow-sm"
              />
            ))}
          </div>
        </header>

        <TodoCard
          todoList={current}
          onChangeListOrder={(card) => handleChangeList(card)}
          onDeleteItem={(id) => handleDeleteList(id)}
          onAddItem={(text) => handleAddList(text)}
          onChangeItem={(item) => handleChangeItem(item)}
        />

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
