import { useState } from "react";

import Button from "./base/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

const NewListDialog = ({
  handleAddList,
}: {
  handleAddList: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer p-3 rounded-xl flex items-center justify-between w-full transition-all duration-200 hover:scale-105 bg-white/5 border border-dashed border-white/30">
          <span className="text-white/70 font-medium">+ add new list</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 bg-white">
        <Input
          type="text"
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
      </DialogContent>
    </Dialog>
  );
};

export default NewListDialog;
