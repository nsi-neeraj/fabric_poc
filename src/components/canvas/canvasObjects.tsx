import { FabricImage, Rect } from "fabric";
import { CanvasObjectProps } from "./canvas.interface";
import { BiRectangle } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import Drawer from "../drawer";
import { ChangeEvent, useRef } from "react";
import { currentImageAspectRatio } from "../../utils";

export default function CanvasObjects({ canvas }: CanvasObjectProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const addRect = () => {
    if (!canvas) return;
    const rect = new Rect({
      height: 150,
      width: 150,
      left: 0,
      fill: "red",
    });
    canvas.add(rect);
  };
  // const ExportJSON = () => {
  //   if (!canvas) return;
  //   const json = canvas.toJSON(); // Export only the objects
  //   console.log(json);
  // };

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;

    if (event.target) {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (ev: ProgressEvent<FileReader>) {
          const img = new Image();
          img.src = ev.target?.result as string;
          img.onload = function () {
            const scaleFactor = currentImageAspectRatio(
              canvas,
              img.width,
              img.height
            );
            const fi = new FabricImage(img, {
              scaleX: scaleFactor,
              scaleY: scaleFactor,
            });
            canvas?.add(fi);
            canvas?.renderAll();
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Drawer defaultOpen>
      <BiRectangle
        onClick={addRect}
        className="text-4xl cursor-pointer"
        role="button"
      />

      <FaImage
        role="button"
        className="text-3xl ml-1"
        onClick={() => fileUploadRef.current?.click()}
      />
      <input ref={fileUploadRef} type="file" hidden onChange={addImage} />
    </Drawer>
  );
}
