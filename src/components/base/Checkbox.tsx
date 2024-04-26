import { motion } from "framer-motion";

interface CheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
}

const Checkbox = ({ onChange, id, checked }: CheckboxProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="checkboxChecked rounded-full outline-2 outline-solid outline-check flex flex-row items-center justify-center"
    >
      <input
        onChange={onChange}
        checked={checked || false}
        className="checkInput 
        checked-outline-3 checked-outline-checkedOutline/100 checked-bg-check
        cursor-pointer bg-check/30"
        type="checkbox"
        id={`checkbox${id}`}
        outline-none
        relative
        text-center
        appearance-none
        rounded-full
        checked-relative
        checked-text-tint-1
        w-6
        h-6
      />

      <label
        htmlFor={`checkbox${id}`}
        className="checkedIcon flex flex-row  cursor-pointer justify-center items-center  absolute"
      >
        <div className="i-foundation:check text-6  text-tint-1" />
      </label>
    </motion.div>
  );
};

export default Checkbox;
