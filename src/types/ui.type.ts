import { ReactNode } from "react";

export interface BackdropProps {
  children: ReactNode;
  open: boolean;
  onClose: (show: boolean) => void;
  contentClassName?: string;
  position?: "center";
}
