import { useAnimate } from "framer-motion";
import "../style/checkbox.css";
import { stagger } from "framer-motion/dom";
import { useEffect } from "react";
import Button from "./Button";
export interface TodoItem {
  text: string;
  caption: string;
  checked?: boolean;
  id: number;
}

interface Props {
  list: Array<TodoItem>;
  onChangeItem: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
}

const ListGroup = ({ list, onChangeItem, onDeleteItem }: Props) => {
  const [scoped, animate] = useAnimate();
  useEffect(() => {
    if (list.every((item) => item.checked)) {
      const lastCompletedItem = list.findIndex((item) => !item.checked);
      animate(
        ".checkboxChecked",
        { scale: [1, 1.25, 1] },
        {
          duration: 0.35,
          delay: stagger(0.075, { from: lastCompletedItem }),
        }
      );
    }
  }, [list]);

  function checkedChange(todo: TodoItem, checked: boolean) {
    onChangeItem({ ...todo, checked });
  }
  return (
    <ul ref={scoped}>
      {list.map((todo) => {
        return (
          <li
            key={todo.id}
            my-1
            p-4
            bg-tint-1
            rounded-1
            flex="~ row items-center gap-10"
          >
            <div
              w-full
              rounded-1
              p-2
              duration-300
              flex="~ row items-center gap-4"
              className="hover:bg-tint-2:30"
            >
              <input
                onChange={(e) => checkedChange(todo, e.target.checked)}
                checked={todo.checked || false}
                className="checkboxChecked"
                type="checkbox"
                outline-none
                cursor-pointer
                relative
                text-center
                border-2
                border-solid
                appearance-none
                border-tint-2
                rounded-full
                checked-border-0
                checked-bg-check
                checked-relative
                checked-text-tint-1
                w-6
                h-6
              />

              <div flex="~ col">
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) =>
                    onChangeItem({ ...todo, text: e.target.value })
                  }
                  className={`w-full transition-colors duration-300 appearance-none bg-transparent border-none outline-none text-16px ${
                    todo.checked ? " text-tint-2 line-through" : "text-tint-3"
                  }`}
                />

                {/* {caption && <span text-tint-2>{caption}</span>} */}
              </div>
            </div>
            <Button type="delete" onClick={() => onDeleteItem(todo)} />
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
