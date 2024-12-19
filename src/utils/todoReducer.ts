import { Action, Card, Item, THEMECOLOR } from "../types";
import { v4 as uuidv4 } from "uuid";
import formatDate from "./formatDate";

interface AddAction {
  type: Action.ADD_TO_LIST;
  text: string;
}

interface ChangeThemeAction {
  type: Action.CHANGE_THEME;
  theme: THEMECOLOR;
}

interface ChangeItemAction extends Item {
  type: Action.CHANGE_ITEM;
}

interface ChangeListAction {
  type: Action.RESET_CARD;
  card: Card;
}

interface DeleteAction {
  type: Action.DELETE;
  id: string;
}

export type CardAction =
  | AddAction
  | ChangeThemeAction
  | ChangeItemAction
  | DeleteAction
  | ChangeListAction;

const todoReducer = (todo: Card, action: CardAction) => {
  const { list } = todo;

  switch (action.type) {
    // add
    case Action.ADD_TO_LIST: {
      const create_time = formatDate(new Date());
      list.push({
        checked: false,
        text: action.text,
        caption: "",
        id: uuidv4(),
        create_time,
      });
      break;
    }
    case Action.CHANGE_THEME: {
      todo["theme"] = action.theme;

      break;
    }
    case Action.CHANGE_ITEM: {
      const newList = list.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action,
            update_time: formatDate(new Date()),
          };
        }
        return item;
      });

      return {
        ...todo,
        list: newList,
      };
    }
    case Action.DELETE: {
      const filteredList = list.filter((i) => i.id !== action.id);
      return {
        ...todo,
        list: filteredList,
      };
    }
    case Action.RESET_CARD: {
      return action.card;
    }
    // default: {
    //   return INIT_TODO_CARD;
    // }
  }
};
export default todoReducer;
