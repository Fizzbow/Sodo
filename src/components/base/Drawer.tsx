import { AnimatePresence, motion, Transition, Variants } from "motion/react";

import Backdrop from "./Backdrop";
import { BackdropProps } from "../../types/ui.type";

type Position = "left" | "right";

interface DrawerProps extends BackdropProps {
  key: string;
  position?: Position;
}

const defaultVariantTransition: Transition = {
  // x: { stiffness: 1000 },
  type: "spring",
  delay: 0.4,
};
const defaultDrawerVariants: Record<Position, Variants> = {
  left: {
    visible: {
      x: "20px",
      y: "20px",
      opacity: 1,
      transition: defaultVariantTransition,
    },
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: defaultVariantTransition,
    },
  },
  right: {
    visible: {
      x: "-20px",
      y: "20px",
      opacity: 1,
      transition: defaultVariantTransition,
    },
    hidden: {
      x: "100%",
      opacity: 0,
      transition: defaultVariantTransition,
    },
  },
};

const Drawer = ({
  open,
  onClose,
  children,
  key,
  position = "left",
}: DrawerProps) => {
  console.log("variants", defaultDrawerVariants, { open }, position);
  return (
    <AnimatePresence>
      <Backdrop key={key} open={open} onClose={onClose}>
        {open && (
          <motion.div
            variants={defaultDrawerVariants[position]}
            key={key}
            initial="hidden"
            exit="hidden"
            animate="visible"
          >
            {children}
          </motion.div>
        )}
      </Backdrop>
    </AnimatePresence>
  );
};

export default Drawer;
