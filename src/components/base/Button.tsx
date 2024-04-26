import { MotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface Props extends MotionProps {
  handleType?: "delete" | "plus" | "solid";
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "translucent" | "solid";
  color?: string;
  onClick: () => void;
}

const Button = ({
  className,
  variant = "translucent",
  color,
  onClick,
  startIcon,
  endIcon,
  ...props
}: Props) => {
  const transVariants: Record<string, string> = {
    primary: "bg-primary/30 text-primary/100 hover:bg-red/40",
    error: "bg-error/30 text-error/100 hover:bg-error/40",
    secondary: "bg-secondary/30 text-secondary/100 hover:bg-secondary/40",
  };

  const solidVariants: Record<string, string> = {
    primary: "bg-primary/100 text-secondary/100 hover:bg-red/80",
    secondary: "bg-secondary/100 text-primary/100 hover:bg-secondary/80",
    error: "bg-error/100 text-white/100 hover:bg-error/80",
  };
  return (
    <motion.button
      onClick={onClick}
      {...props}
      className={`
      flex flex-row gap-2
      font-Switzer font-500
      justify-center
      items-center
      p-2
      border-none
      outline-none
      text-center
      cursor-pointer
      rounded-1
      ${variant === "translucent" && transVariants[color as string]}
      ${variant === "solid" && solidVariants[color as string]}
      ${className}
      `}
      whileTap={{ scale: 0.97 }}
    >
      {startIcon}
      {<>{props.children}</>}
      {endIcon}
    </motion.button>
  );
};

export default Button;
