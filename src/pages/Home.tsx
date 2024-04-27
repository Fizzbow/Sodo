import { useEffect, useState } from "react";
import TodoCard, { TodoList } from "./todo/TodoCard";
import { TODO_LIST } from "../constant/todo.constant";

// TODO: caption integrate / multi-todoCard

function initTodoList(): TodoList {
  const storageTodoList = localStorage.getItem(TODO_LIST);

  if (!storageTodoList) {
    return {
      heading: "Title",
      id: "",
      list: [],
    };
  }

  return JSON.parse(storageTodoList);
}

function Home() {
  const [todo, setTodoList] = useState<TodoList>(initTodoList);

  useEffect(() => {
    localStorage.setItem(TODO_LIST, JSON.stringify(todo));
  }, [todo]);

  // function handleChangeTodo(handleTodo: TodoList) {
  //   setTodoList(
  //     todo.map((t) => {
  //       if (t.id === handleTodo.id) return handleTodo;
  //       else return t;
  //     })
  //   );
  // }
  return (
    <>
      <div flex="~ row 1" className="px-6 ">
        <div grid flex-1>
          <TodoCard
            todoList={todo}
            changeTodo={(val) => setTodoList({ ...val })}
          />
        </div>

        {/* <div mx-12 h-full my-auto>
          <Button type="delete" />
        </div> */}
      </div>
    </>
  );
}

export default Home;
