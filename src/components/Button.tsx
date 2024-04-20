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
      font-Switzer font-500
      justify-center
      items-center
      p-2
      border-none
      outline-none
      text-center
      cursor-pointer
      rounded-2
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
        <div className="i-ri:delete-bin-5-line text-6 text-red/100" />
      ) : (
        <>{children}</>
      )}
    </motion.button>
  );
};

export default Button;
