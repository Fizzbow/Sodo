import {
  Reorder,
  useDragControls,
  useMotionValue,
  MotionProps,
} from "motion/react";
import Button from "./base/Button";
import DragIcon from "./DragIcon";
import Checkbox from "./base/Checkbox";

import { Item } from "../types";
import TodoInput from "./base/TodoInput";

interface ItemProps extends MotionProps {
  todo: Item;
  onDeleteItem: (item: Item) => void;
  onChangeItem: (item: Item) => void;
  onClick?: () => void;
}

const ReorderItem = ({
  todo,
  onDeleteItem,
  onChangeItem,
  ...props
}: ItemProps) => {
  // const [open, setOpen] = useState(false);
  // const menus: Menu[] = [
  //   { id: "created", label: "created at" },
  //   { id: "updated", label: "updated at" },
  // ];
  // const [menu, setMenu] = useState<Menu | null>(null);

  const controls = useDragControls();
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      {...props}
      value={todo}
      id={todo.id}
      style={{ y }}
      layout="position"
      dragControls={controls}
      className="px-2 py-2 bg-tint-1  rounded-2 flex flex-row gap-1 items-center
           shadow-[4px_4px_7.1px_0px_rgba(0,0,0,0.10)]
          hover:outline-checkedOutline hover:outline-solid hover:outline-2"
    >
      <Checkbox
        id={todo.id}
        checked={todo.checked}
        onChange={(e) =>
          onChangeItem({
            checked: e.target.checked,
            id: todo.id,
          })
        }
      />
      <div className="flex flex-col flex-1">
        <TodoInput
          disabled={todo.checked}
          value={todo.text}
          maxLength={200}
          onChange={(e) => {
            onChangeItem({
              id: todo.id,
              text: e.target.value,
            });
          }}
        />
        {/* <div className="flex flex-row font-Switzer items-center text-3 gap-2">
          <DropDown
            open={open}
            menus={menus}
            defaultMenuId={menus[0].id}
            setOutSideOpen={(val) => setOpen(val)}
            setMenu={(id) => {
              const curren = menus.find((i) => i.id === id);
              if (curren) setMenu({ ...curren });
            }}
            trigger={
              <span
                text="check/100"
                className="font-400 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                {menu?.label}
              </span>
            }
          />
          <span className="font-400 text-tint-3/70">
            {menu?.id === "created" ? todo.create_time : todo.update_time}
          </span>
        </div> */}
      </div>

      <Button
        handleType="delete"
        color="error"
        className="rounded-1 p-[2px!important]"
        onClick={() => onDeleteItem(todo)}
        startIcon={<div className="i-ri:delete-bin-line text-5" />}
      />
      <DragIcon dragControls={controls} />
    </Reorder.Item>
  );
};

export default ReorderItem;
