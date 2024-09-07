import { useEffect, useRef } from "react";

interface TodoInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  checked?: boolean;
}

const TodoInput = ({ checked, ...props }: TodoInputProps) => {
  const todoInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = todoInputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [props.value]);

  return (
    <textarea
      ref={todoInputRef}
      {...props}
      rows={1}
      disabled={checked}
      className={`flex-1 overflow-hidden py-1 px-2  rounded-1 font-Switzer font-500 transition-all-color appearance-none bg-transparent border-none outline-none text-16px ${
        checked
          ? "text-tint-2/100 line-through cursor-not-allowed"
          : "text-tint-3/100 hover:bg-tint-2:30"
      }`}
    >
      {props.value}
    </textarea>
  );
};

export default TodoInput;
