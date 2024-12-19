import { Reorder, useAnimate } from "framer-motion";
import "../style/checkbox.css";
import { useEffect, useRef, useState } from "react";
import Button from "./base/Button";

import Dialog from "./base/Dialog";
import { Card, Item } from "../types";
import ReorderItem from "./ReorderItem";

interface ListProps {
  list: Array<Item>;
  onChangeItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  onAddItem: (text: string) => void;
  onChangeListOrder: (list: Card["list"]) => void;
}

const ListGroup = ({
  list,
  onChangeItem,
  onDeleteItem,
  onChangeListOrder,
  onAddItem,
}: ListProps) => {
  const [scoped] = useAnimate();
  /** dialog state */
  const [dialogShow, setDialogShow] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleAcceptAddItem() {
    if (!inputVal) return;

    onAddItem(inputVal);
    setDialogShow(false);
    setInputVal("");
  }

  return (
    <>
      <section className="flex flex-row justify-start px-4">
        <div
          className="text-secondary/100 flex flex-row cursor-pointer gap-2 w-28 items-center"
          onClick={() => setDialogShow(!dialogShow)}
        >
          <div className="i-gravity-ui:plus text-5 font-600" />
          <span>New Item</span>
        </div>
      </section>

      {!!list && (
        <Reorder.Group
          axis="y"
          values={list}
          onReorder={onChangeListOrder}
          ref={scoped}
          className="mb-4 flex flex-col gap-4 overflow-auto scrollStyle p-4 h-100%"
        >
          {list.map((todo) => {
            return (
              <ReorderItem
                todo={todo}
                key={todo.id}
                onChangeItem={(item) => onChangeItem(item)}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
        </Reorder.Group>
      )}

      <Dialog open={dialogShow} onClose={setDialogShow}>
        <section my-4>
          <input
            type="text"
            min-w-xs
            text-16px
            py-2
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
