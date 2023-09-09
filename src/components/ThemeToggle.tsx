import { motion } from "framer-motion";
import { useState } from "react";
import { Theme } from "../contexts/themes";

interface Props {
  themes: Theme[];
  setTheme: (themeId: Theme["themeId"]) => void;
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

const ThemeToggle = ({ themes, setTheme }: Props) => {
  const [showToggle, setShowToggle] = useState(false);
  return (
    <header my-6 flex="~ row items-center justify-end">
      <nav w-50>
        <motion.button
          cursor-pointer
          className="bg-word/100
           w-full 
           rounded-3
           flex
           flex-row
           justify-between
         text-backdrop/100
           font-700
           mb-3
           text-18px
           py-10px
           px-20px
           border-none
         "
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowToggle(!showToggle)}
        >
          <span>ToggleTheme</span>
          <div
            style={{ transform: showToggle ? "rotate(180deg)" : "rotate(0)" }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path className="fill-backdrop/100" d="M0 7 L 20 7 L 10 16" />
            </svg>
          </div>
        </motion.button>

        {showToggle && (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={container}
            className="bg-word  absolute p-4 overflow-hidden rounded-6 grid-cols-4 grid w-50 h-20"
          >
            {themes.map((theme) => (
              <motion.li
                key={theme.themeId}
                onClick={() => setTheme(theme.themeId)}
                style={{ backgroundColor: theme.color }}
                className="cursor-pointer self-center justify-self-center w-9 h-9 rounded-9999"
                variants={item}
              />
            ))}
          </motion.ul>
        )}
      </nav>
    </header>
  );
};

export default ThemeToggle;
