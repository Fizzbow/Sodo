import { motion } from "framer-motion";

interface CheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
}

const Checkbox = ({ onChange, id, checked }: CheckboxProps) => {
  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className={`checkboxChecked relative rounded-full overflow-hidden border-3 border-solid cursor-pointer  flex flex-row items-center w-8 h-8 justify-center  ${
        checked
          ? " border-checkedOutline/100 bg-check"
          : " border-check bg-check/30"
      }`}
    >
      <input
        onChange={onChange}
        checked={checked || false}
        className="checkInput "
        type="checkbox"
        id={`checkbox${id}`}
        text-center
        appearance-none
        rounded-full
      />

      <div className="checkedIcon i-foundation:check text-5  absolute text-tint-1/100" />
    </motion.label>
  );
};

export default Checkbox;
