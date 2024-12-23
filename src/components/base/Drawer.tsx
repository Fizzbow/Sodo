import { AnimatePresence, motion, Transition, Variants } from "motion/react";

import Backdrop from "./Backdrop";
import { BackdropProps } from "../../types/ui.type";

type Arc = "left" | "right";

export interface DrawerProps extends BackdropProps {
  key: string;
  arc?: Arc;
}

const delay = 0.1;

const defaultVariantTransition: Transition = {
  // x: { stiffness: 1000 },
  type: "ease",
  delay,
};
const defaultDrawerVariants: Record<Arc, Variants> = {
  left: {
    visible: {
      x: "0px",
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
  arc = "left",
}: DrawerProps) => {
  return (
    <AnimatePresence>
      <Backdrop duration={delay} key={key} open={open} onClose={onClose}>
        {open && (
          <motion.div
            variants={defaultDrawerVariants[arc]}
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
