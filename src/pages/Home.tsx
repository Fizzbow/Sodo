import { useState } from "react";
import TodoCard, { TodoList } from "./todo/TodoCard";
import { motion } from "framer-motion";
import TODO_LIST from "../constant/localstorage.contant";

const todoList: TodoList[] = [
  {
    heading: "TODOlist",
    id: 1,
    list: [
      { text: "an item", caption: "captions", id: 1 },
      { text: "items", caption: "captions", id: 2 },
      { text: "new york", caption: "captions", id: 3 },
      {
        text: "new york",
        caption: "captions",
        id: "saldihypoiuyw0q98uoknjlkn",
      },
    ],
  },
];
const storageTodoList: TodoList[] = localStorage.getItem(TODO_LIST);

function initTodoList() {
  if (!storageTodoList) return todoList;
  return storageTodoList;
}

function Home() {
  const [todo, setTodoList] = useState(initTodoList);
  //   const changeInput = useCallback((event) => {
  //     changeHeading(event.target.value);
  //   }, []);

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

        <div mx-12 h-full my-auto>
          <motion.button
            className="
            border-none
            bg-word/20  
            outline-none
            cursor-pointer
            rounded-1
            w-full
            flex-row
            font-700
            mb-3
            p-4
            text-18px
            hover:bg-word/40
            "
            whileTap={{ scale: 0.97 }}
          >
            <div style={{ transform: "rotate(180deg)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 20 20"
              >
                <path d="M8 2h4v16h-4z" className="fill-word/100" />
                <path d="M2 8h16v4H2z" className="fill-word/100" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default Home;
