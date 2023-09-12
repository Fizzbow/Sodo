import { useCallback, useState } from "react";
import ListGroup from "../../components/ListGroup";
import { ItemProps } from "../../components/ListGroup";

export interface TodoList {
  heading: string;
  id: number;
  list: Array<ItemProps>;
}

interface Props {
  todoList: TodoList[];
  changeTodo: (list: TodoList) => void;
}

const TodoCard = ({ todoList, changeTodo }: Props) => {
  return (
    <>
      {todoList.map((item) => {
        return (
          <div key={item.id}>
            <div
              flex="~ row items-center"
              className="hover:bg-tint-2:50 cursor-pointer py-3 px-2 rounded-1 mb-4"
            >
              <input
                type="text"
                className="w-full outline-none font-600 text-word border-none text-7"
                name="headingInput"
                bg-transparent
                appearance-none
                value={item.heading}
                onChange={(e) =>
                  changeTodo({ ...item, heading: e.target.value })
                }
              />
            </div>
            <ListGroup list={item.list} />
          </div>
        );
      })}
    </>
  );
};

export default TodoCard;
