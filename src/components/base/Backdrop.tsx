import { BackdropProps } from "../../types/ui.type";

const Backdrop = ({ children, open, onClose }: BackdropProps) => {
  return (
    <div
      className={`dialog ${open ? "flex" : "hidden"}`}
      onClick={() => onClose(false)}
    >
      {children}
    </div>
  );
};

export default Backdrop;
