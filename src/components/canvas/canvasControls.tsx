import { useEffect, useMemo, useState } from "react";
import { CanvasControlsProps } from "./canvas.interface";
import Drawer from "../drawer";
import { FabricObject } from "fabric";
import Controls from "./controls";

export default function CanvasControls({ canvas }: CanvasControlsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<FabricObject[]>([]);

  useEffect(() => {
    setIsOpen(0 !== selected.length);
  }, [selected]);

  useEffect(() => {
    const handleObjectSelection = (object: FabricObject[]) => {
      if (object) {
        setSelected(object);
      }
    };
    canvas.on("selection:created", (event) => {
      handleObjectSelection(event.selected);
    });
    canvas.on("selection:updated", (event) => {
      handleObjectSelection(event.selected);
    });
    canvas.on("selection:cleared", () => setSelected([]));
  }, [canvas]);

  const renderControls = useMemo(() => {
    if (0 === selected.length) return null;

    const activeObjects = canvas.getActiveObjects();
    return activeObjects.map((selectedItem: FabricObject, index: number) => {
      return (
        <Controls
          key={index}
          canvas={canvas}
          {...selectedItem}
          type={selectedItem.type}
          index={index}
        />
      );
    });
  }, [canvas, selected.length]);

  return (
    <Drawer defaultOpen={isOpen} isOpenUi={isOpen} position="RIGHT">
      {renderControls}
    </Drawer>
  );
}
