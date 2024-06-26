import { ReactNode } from "react";
import "../../style/dialog.css";
import Button from "./Button";
import { motion } from "framer-motion";

interface DialogProps {
  children: ReactNode;
  open: boolean;
  onClose: (show: boolean) => void;
}

const Dialog = ({ onClose, open, children }: DialogProps) => {
  return (
    <div
      className={`dialog ${open ? "flex" : "hidden"}`}
      onClick={() => onClose(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="dialog_content flex flex-col rounded-2"
      >
        <header flex="~ row justify-end">
          <Button
            handleType="solid"
            variant="solid"
            color="check"
            onClick={() => onClose(false)}
          >
            <div
              after="content-empty absolute w-full h-2.5px top-50% left-50% translate--50% bg-white rotate--45"
              before="content-empty absolute w-full h-2.5px top-50% left-50% translate--50% bg-white rotate-45"
              relative
              w-4
              h-4
              bg-transparent
            />
          </Button>
        </header>
        {children}
      </motion.div>
    </div>
  );
};

export default Dialog;
