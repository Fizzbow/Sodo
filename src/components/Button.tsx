import { MotionProps, motion } from "framer-motion";

interface Props extends MotionProps {
  handleType?: "delete" | "plus" | "solid";
  onClick: () => void;
}

const Button = ({ handleType, onClick, ...props }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      {...props}
      className={`
      flex flex-row
      font-Switzer font-500
      justify-center
      items-center
      p-2
      border-none
      outline-none
      text-center
      cursor-pointer
      rounded-2
      ${
        handleType === "delete"
          ? "bg-red/10 hover:bg-red/20"
          : handleType === "plus"
          ? "bg-word/20 hover:bg-word/40"
          : handleType === "solid"
          ? "bg-check/100"
          : ""
      }
      `}
      whileTap={{ scale: 0.97 }}
    >
      {handleType === "plus" ? (
        <div className="i-gravity-ui:plus text-6 font-600 text-word/100" />
      ) : handleType === "delete" ? (
        <div className="i-ri:delete-bin-5-line text-6 text-red/100" />
      ) : (
        <>{props.children}</>
      )}
    </motion.button>
  );
};

export default Button;
