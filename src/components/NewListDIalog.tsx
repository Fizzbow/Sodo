import { useState } from "react";
import Dialog from "./base/Dialog";
import Button from "./base/Button";

const NewListDialog = ({
  open,
  onClose,
  handleAddList,
}: {
  open: boolean;
  onClose: () => void;
  handleAddList: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  return (
    <Dialog open={open} onClose={onClose}>
      <section my-4>
        <input
          type="text"
          min-w-xs
          text-16px
          py-2
          border-none
          border-b-tint-2
          border-b-solid
          border-b-2
          outline-none
          bg-transparent
          focus="border-b-check transition-all-color"
          placeholder="Enter list name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="solid"
          color="check"
          onClick={() => handleAddList(name)}
        >
          Add
        </Button>
      </section>
    </Dialog>
  );
};

export default NewListDialog;
