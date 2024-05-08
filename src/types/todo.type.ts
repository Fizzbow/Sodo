import { THEMECOLOR } from "./variable.type";

export enum Action {
  ADD_TO_LIST = "add_to_list",
  DELETE = "delete",
  CHANGE_THEME = "change_theme",
  CHANGE_ITEM = "change_item",
  RESET_CARD = "reset_list",
}

export interface Item {
  text?: string;
  caption?: string;
  id: string;
  checked?: boolean;
  create_time?: string;
  update_time?: string;
}

export interface Card {
  title: string;
  card_id: string;
  theme: THEMECOLOR;
  list: Array<Item>;
}
