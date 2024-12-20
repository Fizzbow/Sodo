import Button from "./Button";

import { BackdropProps } from "../../types/ui.type";
import Backdrop from "./Backdrop";

interface DialogProps extends BackdropProps {}

const Dialog = ({
  onClose,
  open,
  children,
  contentClassName,
  position,
}: DialogProps) => {
  return (
    <Backdrop
      position={position}
      contentClassName={contentClassName}
      open={open}
      onClose={onClose}
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
    </Backdrop>
  );
};

export default Dialog;
