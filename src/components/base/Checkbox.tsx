import { motion, useMotionValue, useTransform } from "motion/react";

interface CheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
}

const Checkbox = ({ onChange, id, checked }: CheckboxProps) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  return (
    <motion.label
      onClick={(e) => e.stopPropagation()}
      animate={{
        background: checked ? "rgba(var(--check),1)" : "rgba(var(--check),0.3)",
      }}
      className={`relative rounded-full overflow-hidden border-3 border-solid cursor-pointer  flex flex-row items-center w-6 h-6 justify-center  ${
        checked ? " border-checkedOutline/100 " : " border-check"
      }`}
    >
      <input
        onChange={onChange}
        checked={checked || false}
        type="checkbox"
        id={`checkbox${id}`}
        text-center
        appearance-none
        rounded-full
      />

      {/* <div className="checkedIcon i-foundation:check text-5  absolute text-tint-1/100" /> */}

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="34"
        viewBox="0 0 37 34"
        fill="none"
      >
        <motion.path
          fill="transparent"
          animate={{ pathLength: checked ? 0.9 : 0 }}
          style={{ pathLength, opacity }}
          strokeWidth={6}
          strokeLinecap="square"
          stroke="#fff"
          d="M9 20.9091L14.5 25.4091L21.5 17.5L28.5 9.40909"
        />
      </motion.svg>
    </motion.label>
  );
};

export default Checkbox;
