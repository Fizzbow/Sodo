import { Reorder, useAnimate } from "motion/react";
import "../style/checkbox.css";
import { useEffect, useRef, useState } from "react";
import Button from "./base/Button";

import Dialog from "./base/Dialog";
import { Card, Item } from "../types";
import ReorderItem from "./ReorderItem";
import Drawer from "./base/Drawer";
import Checkbox from "./base/Checkbox";

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerId, setDrawerId] = useState("");
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
      <section className="flex flex-row justify-start">
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
          className="mb-4 flex flex-col gap-4 overflow-y-auto overflow-x-hidden scrollStyle py-4 h-100%"
        >
          {list.map((todo) => {
            return (
              <ReorderItem
                onClick={() => {
                  setOpenDrawer(true), setDrawerId(todo.id);
                }}
                todo={todo}
                key={todo.id}
                onChangeItem={(item) => onChangeItem(item)}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
        </Reorder.Group>
      )}

      <Dialog
        position="center"
        contentClassName="bg-white p-4 rounded-lg"
        open={dialogShow}
        onClose={setDialogShow}
      >
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
      <Drawer
        key={`drawer-${drawerId}`}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        arc="right"
      >
        <ItemDrawerContent
          item={list.find((item) => item.id === drawerId) as Item}
          onChangeItem={onChangeItem}
        />
      </Drawer>
    </>
  );
};

const ItemDrawerContent = ({
  item,
  onChangeItem,
}: {
  item: Item;
  onChangeItem: (item: Item) => void;
}) => {
  return (
    <div
      style={{
        height: "calc(100vh - 2.5rem)",
      }}
      className="p-5 m-5 rounded-lg bg-white text-gray-700 text-sm flex flex-col gap-4"
    >
      <div className="flex flex-row items-center gap-2">
        <Checkbox
          checked={item.checked}
          onChange={(e) => onChangeItem({ ...item, checked: e.target.checked })}
        />
        <span>{item.text}</span>
      </div>

      <div className="w-full h-1px bg-gray-200" />
      <div className="flex flex-row items-center gap-2">
        <span>created at</span>
        <span>{item.create_time}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <span>remind me</span>
        <span>{item.update_time}</span>
      </div>

      <div className="w-full h-1px bg-gray-200" />

      <input
        value={item.caption}
        onChange={(e) => onChangeItem({ ...item, caption: e.target.value })}
        type="text"
        className="w-full"
        placeholder="add note..."
      />
    </div>
  );
};

export default ListGroup;
