import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface DropdownProps {
  open: boolean;
  trigger: ReactNode;
  menus: Array<string>;
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
const DropDown = ({ open, trigger, menus }: DropdownProps) => {
  return (
    <motion.div
      initial={false}
      animate={open ? "visible" : "hidden"}
      className={"flex flex-col gap-2 relative"}
    >
      <motion.div className="appearance-none ">{trigger}</motion.div>
      <motion.ul
        className="container absolute top-[110%] bg-tint-1/100"
        variants={container}
      >
        {menus.map((menu) => (
          <motion.li key={menu} variants={item}>
            {menu}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DropDown;
