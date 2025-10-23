import { motion, Variants, Transition } from "motion/react";
import { ReactNode, useMemo } from "react";

export interface SideBarProps {
  isOpen: boolean;
  children: ReactNode;
  width?: number;
  className?: string;
}

const sidebarTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const SideBar = ({
  isOpen,
  children,
  width = 280,
  className = "",
}: SideBarProps) => {
  const sidebarVariants: Variants = useMemo(() => {
    return {
      open: {
        width,
        opacity: 1,
        transition: sidebarTransition,
      },
      closed: {
        width: 0,
        opacity: 0,
        transition: sidebarTransition,
      },
    };
  }, [width]);

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className={`h-full bg-white shadow-lg flex-shrink-0 overflow-hidden ${className}`}
    >
      <div className="h-full flex flex-col p4">
        <h2 className="text-lg font-semibold  p-4 text-transparent">111</h2>

        {children}
      </div>
    </motion.div>
  );
};

export default SideBar;
