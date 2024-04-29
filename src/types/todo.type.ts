import { THEMECOLOR } from "./variable.type";

export interface Item {
  text: string;
  caption: string;
  checked?: boolean;
  id: string;
  create_time?: string;
  update_time?: string;
}

export interface Card {
  title: string;
  card_id: string;
  theme: THEMECOLOR;
  list: Array<Item>;
}
