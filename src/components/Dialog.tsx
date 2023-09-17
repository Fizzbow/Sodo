import { useState } from "react";
import "../style/dialog.css";
import Button from "./Button";
import { motion } from "framer-motion";

interface Props {
  onCancel: (show: boolean) => void;
  onConfirm: (val: string) => void;
}

const Dialog = ({ onCancel, onConfirm }: Props) => {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="dialog">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="dialog_content flex flex-col rounded-1"
      >
        <header flex="~ row justify-end">
          <Button type="solid" onClick={() => onCancel(false)}>
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
        <section my-4>
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </section>

        <Button
          type="solid"
          onClick={() => {
            onConfirm(inputVal), onCancel(false);
          }}
        >
          <span className="text-white font-600 w-full">OK</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default Dialog;