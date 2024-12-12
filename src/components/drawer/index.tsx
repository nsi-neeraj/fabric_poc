import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { DrawerProps } from "./drawer.types";

export default function Drawer({
  position = "LEFT",
  defaultOpen = false,
  isOpenUi = true,
  children,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const isLeft = position === "LEFT";

  const ActionIcon = isOpen ? IoMdCloseCircle : IoMenu;
  if (!isOpenUi) return;
  if (!isOpen)
    return (
      <ActionIcon
        className={`absolute top-0 z-10 text-4xl text-white ${
          isLeft ? "left-0" : "right-0"
        }`}
        onClick={toggleDrawer}
      />
    );

  return (
    <aside
      className={`bg-black fixed top-0 h-screen w-52 z-10 flex flex-col gap-y-2 ${
        isLeft ? "left-0" : "right-0"
      }`}
    >
      <ActionIcon className="text-4xl text-white" onClick={toggleDrawer} />
      <section className="w-full h-full overflow-auto bg-slate-500">
        {children}
      </section>
    </aside>
  );
}
