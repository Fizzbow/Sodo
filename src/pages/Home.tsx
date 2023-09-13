import { useEffect, useState } from "react";
import TodoCard, { TodoList } from "./todo/TodoCard";
import { motion } from "framer-motion";
import TODO_LIST from "../constant/localstorage.contant";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

const todoList: TodoList[] = [
  {
    heading: "👩‍💻HOME",
    id: 1,
    list: [
      { text: "an item", caption: "captions", id: 1 },
      { text: "items", caption: "captions", id: 2 },
      { text: "new york", caption: "captions", id: 3 },
      {
        text: "new york",
        caption: "captions",
        id: 4,
      },
    ],
  },
];

function initTodoList(): TodoList[] {
  const storageTodoList = localStorage.getItem(TODO_LIST);

  if (!storageTodoList) return todoList;
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
