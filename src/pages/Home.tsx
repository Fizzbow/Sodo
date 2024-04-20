import { useEffect, useState } from "react";
import TodoCard, { TodoList } from "./todo/TodoCard";
import { TODO_LIST } from "../constant/todo.constant";
import { v4 as uuidv4 } from "uuid";

// TODO: caption integrate / multi-todoCard

const todoList: TodoList[] = [
  {
    heading: "👩‍💻CODING PLAN",
    id: "",
    list: [
      {
        text: "Initialize TypeScript in React project",
        caption: "captions",
        id: "",
      },
      { text: "Design UI Components", caption: "captions", id: "" },
      { text: "Integrate UnoCSS", caption: "captions", id: "" },
      {
        text: "Animation with Framer Motion",
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
      <div flex="~ row 1" className="px-6">
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
