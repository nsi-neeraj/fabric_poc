import { PropsWithChildren } from "react";

export type DrawerPosition = "LEFT" | "RIGHT";

export interface DrawerProps extends PropsWithChildren {
  position?: DrawerPosition;
  defaultOpen?: boolean;
  isOpenUi?: boolean;
}
