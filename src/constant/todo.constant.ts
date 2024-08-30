import { Card, THEMECOLOR } from "../types";

const TODO_LIST: string = "__fizz__todo_list__";
const GITHUB_LINK: string = "https://github.com/Fizzbow/todolist";

const INIT_TODO_CARD: Card = {
  title: "Title",
  card_id: "",
  list: [],
  theme: THEMECOLOR.GREEN,
};

export { TODO_LIST, GITHUB_LINK, INIT_TODO_CARD };
