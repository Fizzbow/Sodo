import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

export interface Menu {
  id: string;
  label: string;
}

interface DropdownProps {
  open: boolean;
  trigger: ReactNode;
  menus: Array<Menu>;
  setMenu: (id: string) => void;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const DropDown = ({ open, trigger, setMenu, menus }: DropdownProps) => {
  const [currMenuId, setCurrMenuId] = useState("");

  return (
    <motion.div
      initial={false}
      animate={open ? "visible" : "hidden"}
      className={"flex flex-col gap-2 relative"}
    >
      <motion.div className="appearance-none ">{trigger}</motion.div>
      <motion.ul
        className="container flex flex-col  p1 gap-2 bg-tint-1/85 border-2 border-solid border-check/50 rounded-2 min-w-24   backdrop-blur-3.75 absolute top-[130%] "
        variants={container}
      >
        {menus.map((menu) => (
          <motion.li
            className={` ${
              menu.id === currMenuId
                ? "text-check/100  bg-checkedOutline/40 outline-2 outline-solid outline-checkedOutline/100"
                : "text-tint-3/100"
            } p-1 rounded-1 cursor-pointer`}
            onClick={() => {
              setMenu(menu.id), setCurrMenuId(menu.id);
            }}
            key={menu.id}
            variants={item}
          >
            {menu.label}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DropDown;
