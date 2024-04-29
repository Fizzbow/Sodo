import {
  Reorder,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import "../style/checkbox.css";
import { stagger } from "framer-motion/dom";
import { useEffect, useRef, useState } from "react";
import Button from "./base/Button";
import DragIcon from "./DragIcon";

import Dialog from "./base/Dialog";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "./base/Checkbox";
import { Card } from "../types";
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
  onChangeList: (list: Card["list"]) => void;
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
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleAcceptAddItem() {
    if (!inputVal) return;
    onAddItem({ checked: false, text: inputVal, caption: "", id: uuidv4() });
    setDialogShow(false);
  }

  /** checkbox animation */
  useEffect(() => {
    if (!list || !list.length) return;
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
      {!!list && (
        <Reorder.Group
          axis="y"
          values={list}
          onReorder={onChangeList}
          ref={scoped}
          className="mb-4  flex flex-col gap-7"
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
      )}

      <section className="flex flex-row justify-start">
        <div
          className="text-secondary/100 flex flex-row cursor-pointer gap-2 py-4 px-2 w-28 items-center"
          onClick={() => setDialogShow(!dialogShow)}
        >
          <div className="i-gravity-ui:plus text-5 font-600 " />
          <span>New Item</span>
        </div>
      </section>

      <Dialog open={dialogShow} onClose={setDialogShow}>
        <section my-4>
          <input
            min-w-xs
            py-2
            text-16px
            type="text"
            border-none
            border-b-tint-2
            border-b-solid
            border-b-2
            outline-none
            bg-transparent
            focus="border-b-check transition duration-300"
            value={inputVal}
            placeholder="type anything you want to do..."
            onChange={(e) => setInputVal(e.target.value)}
            ref={inputRef}
          />
        </section>

        <Button variant="solid" color="check" onClick={handleAcceptAddItem}>
          <span className="text-white font-600 w-full">ADD</span>
        </Button>
      </Dialog>
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
        style={{ y }}
        dragControls={controls}
        className="px-4 py-2 bg-tint-1 rounded-2
        flex flex-row items-center gap-5 shadow-[4px_4px_7.1px_0px_rgba(0,0,0,0.30)]
        hover:outline-checkedOutline hover:outline-solid hover:outline-2
        "
      >
        <div w-full duration-300 flex="~ row items-center gap-2">
          <Checkbox
            id={todo.id}
            checked={todo.checked}
            onChange={(e) => {
              checkedChange(todo, e.target.checked);
            }}
          />
          <div className="flex flex-col w-auto px-2">
            <input
              type="text"
              value={todo.text}
              size={todo.text.length}
              onChange={(e) => onChangeItem({ ...todo, text: e.target.value })}
              className={`w-full py-1  rounded-1 font-Switzer font-500  hover:bg-tint-2:30 transition-colors duration-300 appearance-none bg-transparent border-none outline-none text-18px ${
                todo.checked
                  ? " text-tint-2/100 line-through"
                  : "text-tint-3/100"
              }`}
            />
          </div>
        </div>
        <Button
          handleType="delete"
          color="error"
          className="rounded-2 p-[5px!important]"
          onClick={() => onDeleteItem(todo)}
          startIcon={<div className="i-ri:delete-bin-5-line text-5" />}
        />
        <DragIcon dragControls={controls} />
      </Reorder.Item>
    </>
  );
};

export default ListGroup;
