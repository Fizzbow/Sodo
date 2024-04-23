import { MotionProps, motion } from "framer-motion";

interface Props extends MotionProps {
  handleType?: "delete" | "plus" | "solid";
  className?: string;
  onClick: () => void;
}

const Button = ({ handleType, className, onClick, ...props }: Props) => {
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
      rounded-1
      ${className}
      ${
        handleType === "delete"
          ? "bg-red/10 hover:bg-red/20"
          : handleType === "plus"
          ? "hover:bg-word/20 bg-transparent"
          : handleType === "solid"
          ? "bg-check/100"
          : ""
      }
      `}
      whileTap={{ scale: 0.97 }}
    >
      {handleType === "plus" ? (
        <div className="flex flex-row gap-3 items-center text-word/60">
          <div className="i-gravity-ui:plus text-5 font-600 " />
          <span>New Item</span>
        </div>
      ) : handleType === "delete" ? (
        <div className="i-ri:delete-bin-5-line text-6 text-red/100" />
      ) : (
        <>{props.children}</>
      )}
    </motion.button>
  );
};

export default Button;
