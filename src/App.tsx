import { useState } from "react";

import THEMES from "./constant/themes.constant";
import { Action, Card, Item, THEMECOLOR } from "./types";
import { GLOBAL_VAR_THEME } from "./constant/css.constant";

import TodoCard from "./pages/todo/TodoCard";

import SideBar from "./components/SideBar";
import { useTodoStore } from "./store/db";
import NewListDialog from "./components/NewListDIalog";

const generateBackgroundGradient = (theme: THEMECOLOR) => {
  const colors = GLOBAL_VAR_THEME[theme];
  const [r, g, b] = colors.primary.split(",").map(Number);

  const darkR = Math.max(0, r - 40);
  const darkG = Math.max(0, g - 40);
  const darkB = Math.max(0, b - 40);

  // 生成更深色变体
  const darkerR = Math.max(0, r - 60);
  const darkerG = Math.max(0, g - 60);
  const darkerB = Math.max(0, b - 60);

  return `linear-gradient(135deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${darkR}, ${darkG}, ${darkB}) 50%, rgb(${darkerR}, ${darkerG}, ${darkerB}) 100%)`;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const { cards, currentId, dispatchToCard, createCard, setCurrent } =
    useTodoStore();

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
    <div
      className="h-screen w-full transition-all duration-500 ease-out"
      style={{
        background: current?.theme
          ? generateBackgroundGradient(current.theme)
          : generateBackgroundGradient(THEMECOLOR.GREEN),
      }}
    >
      <div className="flex h-full w-full p-4">
        <SideBar
          isOpen={isSidebarOpen}
          className={`backdrop-blur-xl bg-white/20 border border-white/30 flex flex-col rounded-2xl ${
            isSidebarOpen ? "mr-4" : "mr-0"
          }`}
        >
          <div className="flex items-center flex-1 flex-col gap-2">
            {Object.keys(cards).map((key) => {
              const isSelected = currentId === key;
              return (
                <div
                  className={`cursor-pointer p-3 rounded-xl flex items-center justify-between w-full transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? "bg-white/30 border-2 border-white/60 border-solid shadow-lg"
                      : "bg-white/10 border border-white/20"
                  }`}
                  key={key}
                  onClick={() => setCurrent(key)}
                >
                  <span
                    className={`font-medium ${
                      isSelected ? "text-white" : "text-white/90"
                    }`}
                  >
                    {cards[key].title}
                  </span>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
          <div
            onClick={() => setNewListDialogOpen(true)}
            className="cursor-pointer p-3 rounded-xl flex items-center justify-between w-full transition-all duration-200 hover:scale-105 bg-white/5 border border-dashed border-white/30"
          >
            <span className="text-white/70 font-medium">+ add new list</span>
          </div>
        </SideBar>

        <div
          flex="~ col"
          className={`themed ${current?.theme} font-Poppins font-500 px-6 flex-1 h-full transition-all duration-500 ease-out bg-primary rounded-2xl`}
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

      <NewListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
        handleAddList={(name) => createCard(name)}
      />
    </div>
  );
}

export default App;
