import {
  Reorder,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import "../style/checkbox.css";
import { stagger } from "framer-motion/dom";
import { useEffect, useState } from "react";
import Button from "./Button";
import DragIcon from "./DragIcon";
import { TodoList } from "../pages/todo/TodoCard";
import Dialog from "../components/Dialog";
import { v4 as uuidv4 } from "uuid";
export interface TodoItem {
  text: string;
  caption: string;
  checked?: boolean;
  id: string;
}

interface ListProps {
  list: Array<TodoItem>;
  onChangeItem: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
  onAddItem: (item: TodoItem) => void;
  onChangeList: (list: TodoList) => void;
}

const ListGroup = ({
  list,
  onChangeItem,
  onDeleteItem,
  onChangeList,
  onAddItem,
}: ListProps) => {
  const [scoped, animate] = useAnimate();
  /** dialog state */
  const [dialogShow, setDialogShow] = useState(false);

  /** checkbox animation */
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

  return (
    <>
      <Reorder.Group
        flex-1
        axis="y"
        values={list}
        onReorder={onChangeList}
        ref={scoped}
      >
        {list.map((todo) => {
          return (
            <CheckboxItem
              todo={todo}
              key={todo.id}
              onChangeItem={onChangeItem}
              onDeleteItem={onDeleteItem}
            />
          );
        })}
      </Reorder.Group>
      <Button type="plus" onClick={() => setDialogShow(!dialogShow)}>
        <span className="text-word/100 mr-2 font-600">add item</span>
      </Button>

      {dialogShow && (
        <Dialog
          onCancel={(val) => setDialogShow(val)}
          onConfirm={(val) =>
            onAddItem({ checked: false, text: val, caption: "", id: uuidv4() })
          }
        />
      )}
    </>
  );
};

interface ItemProps {
  todo: TodoItem;
  onDeleteItem: (item: TodoItem) => void;
  onChangeItem: (item: TodoItem) => void;
}

const CheckboxItem = ({ todo, onDeleteItem, onChangeItem }: ItemProps) => {
  function checkedChange(todo: TodoItem, checked: boolean) {
    onChangeItem({ ...todo, checked });
  }
  const controls = useDragControls();
  const y = useMotionValue(0);
  return (
    <>
      <Reorder.Item
        value={todo}
        id={todo.id}
        dragListener={false}
        style={{ y }}
        dragControls={controls}
        className=" 
        my-2
        p-4
        bg-tint-1
        rounded-1
        flex
        flex-row 
        items-center 
        gap-5"
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
              onChange={(e) => onChangeItem({ ...todo, text: e.target.value })}
              className={`w-full transition-colors duration-300 appearance-none bg-transparent border-none outline-none text-16px ${
                todo.checked ? " text-tint-2 line-through" : "text-tint-3"
              }`}
            />

            {/* {caption && <span text-tint-2>{caption}</span>} */}
          </div>
        </div>
        <Button type="delete" onClick={() => onDeleteItem(todo)} />
        <DragIcon dragControls={controls} />
      </Reorder.Item>
    </>
  );
};

export default ListGroup;
