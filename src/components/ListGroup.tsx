import { Reorder, useAnimate } from "framer-motion";
import "../style/checkbox.css";
import { stagger } from "framer-motion/dom";
import { useEffect, useRef, useState } from "react";
import Button from "./base/Button";

import Dialog from "./base/Dialog";
import { v4 as uuidv4 } from "uuid";
import { Card, Item } from "../types";
import ReorderItem from "./ReorderItem";
import formatDate from "../utils/formatDate";

interface ListProps {
  list: Array<Item>;
  onChangeItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  onAddItem: (item: Item) => void;
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
    const create_time = formatDate(new Date());

    onAddItem({
      checked: false,
      text: inputVal,
      caption: "",
      id: uuidv4(),
      create_time,
    });
    setDialogShow(false);
    setInputVal("");
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
              <ReorderItem
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
            focus="border-b-check transition-all-color"
            value={inputVal}
            placeholder="type anything you want to do..."
            onChange={(e) => setInputVal(e.target.value)}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              handleAcceptAddItem();
            }}
          />
        </section>

        <Button variant="solid" color="check" onClick={handleAcceptAddItem}>
          <span className="text-white font-600 w-full">ADD</span>
        </Button>
      </Dialog>
    </>
  );
};

export default ListGroup;
