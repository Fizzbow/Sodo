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
      {...props}
      ref={todoInputRef}
      rows={1}
      className="flex-1 overflow-hidden py-1 text-tint-3/100 hover:bg-tint-2:30 disabled:bg-transparent  disabled:line-through disabled:text-tint-2/100 disabled:cursor-not-allowed px-2  rounded-1 font-Switzer font-500 transition-all-color appearance-none bg-transparent border-none outline-none text-16px "
    >
      {props.value}
    </textarea>
  );
};

export default TodoInput;
