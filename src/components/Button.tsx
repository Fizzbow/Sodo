import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  type?: "delete" | "plus" | "solid";
  children?: ReactNode;
  onClick: () => void;
}

const Button = ({ type, onClick, children }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
      flex
      justify-center
      items-center
      p-2
      border-none
      outline-none
      text-center
      cursor-pointer
      rounded-1
      flex-row
      ${
        type === "delete"
          ? "bg-red/10 hover:bg-red/20"
          : type === "plus"
          ? "bg-word/20 hover:bg-word/40"
          : type === "solid"
          ? "bg-check/100"
          : ""
      }
      `}
      whileTap={{ scale: 0.97 }}
    >
      {type === "plus" ? (
        <>
          {children}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 20"
          >
            <path d="M8 2h4v16h-4z" className="fill-word/100" />
            <path d="M2 8h16v4H2z" className="fill-word/100" />
          </svg>
        </>
      ) : type === "delete" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 125"
          width="28"
          height="28"
        >
          <path
            className="fill-red/100"
            d="M40,76.29a4,4,0,0,0,4-4V51a4,4,0,0,0-8,0V72.29A4,4,0,0,0,40,76.29Z"
          />
          <path
            className="fill-red/100"
            d="M60,76.29a4,4,0,0,0,4-4V51a4,4,0,0,0-8,0V72.29A4,4,0,0,0,60,76.29Z"
          />
          <path
            className="fill-red/100"
            d="M82.67,16.33H64.31V14.75a8,8,0,0,0-8-8H43.69a8,8,0,0,0-8,8v1.58H17.33a4,4,0,0,0-4,4v16a4,4,0,0,0,4,4h4.4V79.25a14,14,0,0,0,14,14H64.27a14,14,0,0,0,14-14V40.33h4.4a4,4,0,0,0,4-4v-16A4,4,0,0,0,82.67,16.33Zm-39-1.58H56.31v1.58H43.69ZM70.27,79.25a6,6,0,0,1-6,6H35.73a6,6,0,0,1-6-6V40.33H70.27Zm8.4-46.91H21.33v-8H78.67Z"
          />
        </svg>
      ) : (
        <>{children}</>
      )}
    </motion.button>
  );
};

export default Button;
