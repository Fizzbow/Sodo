import { DragControls } from "motion/react";

interface Props {
  dragControls: DragControls;
}

export default function DragIcon({ dragControls }: Props) {
  return (
    <div
      className="i-ri:draggable text-5 cursor-move text-tint-3/100"
      onPointerDown={(event) => dragControls.start(event)}
    />
  );
}
