import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import Button from "./base/Button";
import DragIcon from "./DragIcon";
import Checkbox from "./base/Checkbox";

import { Item } from "../types";
import DropDown, { Menu } from "./base/DropDown";
import { useState } from "react";

interface ItemProps {
  todo: Item;
  onDeleteItem: (item: Item) => void;
  onChangeItem: (item: Item) => void;
}

const ReorderItem = ({ todo, onDeleteItem, onChangeItem }: ItemProps) => {
  const [open, setOpen] = useState(false);
  const menus: Menu[] = [
    { id: "created", label: "created at" },
    { id: "updated", label: "updated at" },
  ];
  const [menu, setMenu] = useState<Menu | null>(null);

  function checkedChange(todo: Item, checked: boolean) {
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
           shadow-[4px_4px_7.1px_0px_rgba(0,0,0,0.30)]
          hover:outline-checkedOutline hover:outline-solid hover:outline-2"
      >
        <div className=" flex flex-row items-center gap-5">
          <div flex="~ row items-center gap-2 1">
            <Checkbox
              id={todo.id}
              checked={todo.checked}
              onChange={(e) => {
                checkedChange(todo, e.target.checked);
              }}
            />
            <input
              type="text"
              value={todo.text}
              disabled={todo.checked}
              onChange={(e) => onChangeItem({ ...todo, text: e.target.value })}
              className={`flex-1 py-1 px-2  rounded-1 font-Switzer font-500   transition-all-color appearance-none bg-transparent border-none outline-none text-16px ${
                todo.checked
                  ? "text-tint-2/100 line-through cursor-not-allowed"
                  : "text-tint-3/100 hover:bg-tint-2:30"
              }`}
            />
          </div>
          <Button
            handleType="delete"
            color="error"
            className="rounded-2 p-[5px!important]"
            onClick={() => onDeleteItem(todo)}
            startIcon={<div className="i-ri:delete-bin-5-line text-5" />}
          />
          <DragIcon dragControls={controls} />
        </div>

        <div className="mt-1 ml-10 flex flex-row">
          <DropDown
            open={open}
            menus={menus}
            setMenu={(id) => {
              const curren = menus.find((i) => i.id === id);
              if (curren) setMenu({ ...curren });
            }}
            trigger={
              <Button
                className="py-1 text-3"
                onClick={() => setOpen(!open)}
                variant="translucent"
                color="check"
              >
                {menu?.label}
              </Button>
            }
          />
        </div>
      </Reorder.Item>
    </>
  );
};

export default ReorderItem;
