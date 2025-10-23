import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";
import { Card, THEMECOLOR } from "../types";
import { CardAction } from "../utils/todoReducer";
import todoReducer from "../utils/todoReducer";
import { v4 as uuidv4 } from "uuid";

/** IndexedDB backend */
const lf = localforage.createInstance({
  name: "fizz",
  storeName: "todo",
});

const idbStorage = {
  getItem: (name: string) => lf.getItem<string>(name),
  setItem: (name: string, value: string) => lf.setItem(name, value),
  removeItem: (name: string) => lf.removeItem(name),
};

/** 默认卡片（当没有任何卡片时使用） */
const defaultCard: Card = {
  title: "Todo",
  card_id: "default",
  theme: THEMECOLOR.GREEN,
  list: [
    {
      id: uuidv4(),
      text: "欢迎使用 Todo 应用 👋",
      caption: "点击复选框完成任务",
      checked: false,
      create_time: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text: "你可以点击左上角菜单新建更多列表",
      caption: "支持多卡片管理",
      checked: false,
      create_time: new Date().toISOString(),
    },
  ],
};

/** Zustand 状态定义 */
interface TodoState {
  cards: Record<string, Card>;
  currentId: string | null;

  createCard: (title: string, theme?: THEMECOLOR) => string;
  deleteCard: (id: string) => void;
  setCurrent: (id: string) => void;
  renameCard: (id: string, title: string) => void;
  dispatchToCard: (id: string, action: CardAction) => void;
}

/** Zustand store */
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      cards: { [defaultCard.card_id]: defaultCard },
      currentId: defaultCard.card_id,

      createCard: (title, theme = THEMECOLOR.GREEN) => {
        const id = uuidv4();
        const newCard: Card = {
          title,
          card_id: id,
          theme,
          list: [],
        };
        set((s) => ({
          cards: { ...s.cards, [id]: newCard },
          currentId: id,
        }));
        return id;
      },

      deleteCard: (id) =>
        set((s) => {
          const { [id]: _ignored, ...rest } = s.cards;
          let nextCards = rest;
          let nextId = s.currentId;

          if (Object.keys(rest).length === 0) {
            nextCards = { [defaultCard.card_id]: defaultCard };
            nextId = defaultCard.card_id;
          } else if (s.currentId === id) {
            nextId = Object.keys(rest)[0];
          }

          return { cards: nextCards, currentId: nextId };
        }),

      setCurrent: (id) => set(() => ({ currentId: id })),

      renameCard: (id, title) =>
        set((s) => ({
          cards: {
            ...s.cards,
            [id]: { ...s.cards[id], title },
          },
        })),

      dispatchToCard: (id, action) =>
        set((s) => {
          const card = s.cards[id];
          if (!card) return s;
          const updated = todoReducer(card, action) ?? card;
          return {
            cards: {
              ...s.cards,
              [id]: updated,
            },
          };
        }),
    }),
    {
      name: "__fizz__todo_cards__",
      storage: createJSONStorage(() => idbStorage),
      version: 1,

      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.cards || Object.keys(state.cards).length === 0) {
          state.cards = { [defaultCard.card_id]: defaultCard };
          state.currentId = defaultCard.card_id;
        }
      },
    }
  )
);
