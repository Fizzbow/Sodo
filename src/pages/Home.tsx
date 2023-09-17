import { useEffect, useState } from "react";
import TodoCard, { TodoList } from "./todo/TodoCard";
import TODO_LIST from "../constant/localstorage.contant";
import { v4 as uuidv4 } from "uuid";

const todoList: TodoList[] = [
  {
    heading: "👩‍💻HOME",
    id: "",
    list: [
      { text: "an item", caption: "captions", id: "" },
      { text: "items", caption: "captions", id: "" },
      { text: "new york", caption: "captions", id: "" },
      {
        text: "new york",
        caption: "captions",
        id: "",
      },
    ],
  },
];

function addUuid(list: TodoList[]): TodoList[] {
  const resultArr = list.map((item) => {
    if (!item) return;
    item.id = uuidv4();
    for (const i in item) {
      const val = item[i as keyof TodoList];
      if (Array.isArray(val)) {
        val.forEach((i) => {
          i.id = uuidv4();
        });
      }
    }
    return item;
  });
  return resultArr as TodoList[];
}

function initTodoList(): TodoList[] {
  const storageTodoList = localStorage.getItem(TODO_LIST);

  if (!storageTodoList) return addUuid(todoList);
  return JSON.parse(storageTodoList);
}

function Home() {
  const [todo, setTodoList] = useState(initTodoList);

  useEffect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(todo));
  }, [todo]);

  function handleChangeTodo(handleTodo: TodoList) {
    setTodoList(
      todo.map((t) => {
        if (t.id === handleTodo.id) return handleTodo;
        else return t;
      })
    );
  }
  return (
    <>
      <div flex="~ row " w-full>
        <div grid flex-1>
          <TodoCard todoList={todo} changeTodo={handleChangeTodo} />
        </div>

        {/* <div mx-12 h-full my-auto>
          <Button type="delete" />
        </div> */}
      </div>
    </>
  );
}

export default Home;
