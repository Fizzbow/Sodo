import { motion } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface Menu {
  id: string;
  label: string;
}

interface DropdownProps {
  open: boolean;
  trigger: ReactNode;
  menus: Array<Menu>;
  setMenu: (id: string) => void;
  setOutSideOpen: (open: boolean) => void;
  defaultMenuId?: string;
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
const DropDown = ({
  open,
  setOutSideOpen,
  trigger,
  setMenu,
  menus,
  defaultMenuId,
}: DropdownProps) => {
  const [currMenuId, setCurrMenuId] = useState(() => {
    if (defaultMenuId) return defaultMenuId;
  });
  const menuRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleChickOutside = (event: MouseEvent) => {
    if (triggerRef.current?.contains(event.target as Node)) return;
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOutSideOpen(false);
    }
  };

  useEffect(() => {
    if (defaultMenuId) {
      setMenu(defaultMenuId);
    }
  }, [defaultMenuId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleChickOutside);
    return () => {
      document.removeEventListener("mousedown", handleChickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={open ? "visible" : "hidden"}
      className={"flex flex-col gap-2 relative"}
    >
      <motion.div ref={triggerRef} className="appearance-none">
        {trigger}
      </motion.div>
      <motion.ul
        ref={menuRef}
        className="container shadow-sm flex flex-col p2 gap-2 bg-tint-1 border-1.5px border-solid border-tint-2/60 rounded-2 min-w-26 backdrop-blur-3.75 absolute top-[130%] "
        variants={container}
      >
        {menus.map((menu) => (
          <motion.li
            className={`${
              menu.id === currMenuId
                ? "text-check/100  bg-checkedOutline/60 outline-2 outline-solid outline-checkedOutline/100"
                : "text-tint-2/100"
            } px-2 py-1 rounded-1 text-nowrap cursor-pointer`}
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
