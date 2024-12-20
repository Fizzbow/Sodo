import { motion } from "motion/react";
import { BackdropProps } from "../../types/ui.type";

const Backdrop = ({
  children,
  open,
  onClose,
  contentClassName,
  position,
}: BackdropProps) => {
  return (
    <>
      {open && (
        <motion.main
          className={`fixed top-0 left-0 bg-[#171a1c1a] h-100% w-100% flex z-20 ${position === "center" && "justify-center items-center"}`}
          initial={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(6px)",
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          onClick={() => onClose(false)}
        >
          <motion.div
            className={contentClassName}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.main>
      )}
    </>
  );
};

export default Backdrop;
