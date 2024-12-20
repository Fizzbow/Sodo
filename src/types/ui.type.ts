import { ReactNode } from "react";

export interface BackdropProps {
  children: ReactNode;
  open: boolean;
  onClose: (show: boolean) => void;
  duration?: number;
  contentClassName?: string;
  position?: "center";
}
