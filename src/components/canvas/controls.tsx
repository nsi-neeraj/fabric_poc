import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ControlsProps, ObjectType } from "./canvas.interface";
import { isNumber, manageControls } from "../../utils";
import {
  BasicTransformEvent,
  FabricImage,
  FabricObject,
  TPointerEvent,
  TPointerEventInfo,
} from "fabric";
import { FaImage } from "react-icons/fa6";
import { useParams } from "react-router";
import useTemplatesStore from "../../store/templateStore";
import useAuthStore from "../../store/authStore";

const DEFAULTS: Partial<ObjectType> = {
  height: 0,
  width: 0,
  angle: 0,
  top: 0,
  left: 0,
  scaleX: 1,
  scaleY: 1,
};

export default function Controls({
  canvas,
  height = 0,
  width = 0,
  angle = 0,
  top = 0,
  left = 0,
  scaleX = 1,
  scaleY = 1,
  set,
  setCoords,
  type,
  index,
  on,
}: ControlsProps) {
  const fileRef = useRef<HTMLLabelElement | null>(null);
  // const displayCoordinatesRef = useRef<FabricObject | null>(null);
  const { id } = useParams();
  const { updateTemplateObject, removeTemplateObject } = useTemplatesStore();
  const {
    auth: { user },
  } = useAuthStore();

  const [property, setProperty] = useState<Partial<ObjectType>>(DEFAULTS);
  useEffect(() => {
    setProperty({ height, width, angle, top, left, scaleX, scaleY, type });
  }, [height, width, angle, top, left, scaleX, scaleY, type]);

  useEffect(() => {
    const handleObjectScaling = (
      event: BasicTransformEvent<TPointerEvent> & {
        target: FabricObject;
      }
    ) => {
      const dims: Partial<ObjectType> = {
        width: Math.round(event.target.getScaledWidth()),
        height: Math.round(event.target.getScaledHeight()),
        left: event.target.left,
        top: event.target.top,
        scaleX: event.target.scaleX,
        scaleY: event.target.scaleY,
      };

      console.table(dims);
      setProperty((prev) => ({ ...prev, ...dims }));
      set?.(dims);
      setCoords?.();
      canvas.renderAll();
    };

    const handleObjectMove = (
      event: BasicTransformEvent<TPointerEvent> & {
        target: FabricObject;
      }
    ) => {
      const target = event.target;
      // if (!displayCoordinatesRef.current) {
      //   const coordinatesText = new FabricText(`${target.left}/${target.top}`, {
      //     left: target.left,
      //     top: target.top,
      //     fill: "red",
      //   });
      //   displayCoordinatesRef.current = coordinatesText;
      // }
      // displayCoordinatesRef.current.set({ left: 150, top: 150 });
      // displayCoordinatesRef.current.setCoords();
      const dims: Partial<ObjectType> = {
        top: target.top | 0,
        left: target.left | 0,
      };
      if (target.scaleX !== target.scaleY) {
        if (
          event.transform?.corner === "mr" ||
          event.transform?.corner === "ml"
        ) {
          dims.scaleY = target.scaleX;
        } else {
          dims.scaleX = target.scaleY;
        }
      }

      // if (event.target.type === "image") {
      //   const scaleFactor = currentImageAspectRatio(
      //     canvas,
      //     event.target.width,
      //     event.target.height
      //   );
      //   dims.scaleX = scaleFactor;
      //   dims.scaleY = scaleFactor;
      // }
      setProperty((prev) => ({ ...prev, ...dims }));
      set?.(dims);
      setCoords?.();
      canvas.renderAll();
    };

    const handleObjectRotate = (
      event: BasicTransformEvent<TPointerEvent> & {
        target: FabricObject;
      }
    ) => {
      const updatedAngle = +event.target.angle.toFixed(1);
      const dims: Partial<ObjectType> = { angle: updatedAngle };
      setProperty((prev) => ({ ...prev, ...dims }));
      set?.(dims);
      setCoords?.();
      canvas.renderAll();
    };

    const mouseDBLClickHandler = (event: TPointerEventInfo<TPointerEvent>) => {
      if (event.target?.type === "image") {
        fileRef.current?.click();
      }
    };

    canvas.on("object:scaling", handleObjectScaling);
    canvas.on("object:moving", handleObjectMove);
    canvas.on("object:rotating", handleObjectRotate);
    canvas.on("mouse:dblclick", mouseDBLClickHandler);

    return () => {
      canvas.off("object:scaling", handleObjectScaling);
      canvas.off("object:moving", handleObjectMove);
      canvas.off("object:rotating", handleObjectRotate);
      canvas.off("mouse:dblclick", mouseDBLClickHandler);
    };
  }, [
    canvas,
    id,
    index,
    height,
    width,
    scaleX,
    scaleY,
    angle,
    top,
    left,
    set,
    setCoords,
    updateTemplateObject,
    on,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    const updatedProperties: Partial<ObjectType> = property;

    switch (name) {
      case "width":
        if (isNumber(value) || value === "") {
          updatedProperties.width = +value;
        }
        break;
      case "height":
        if (isNumber(value) || value === "") {
          updatedProperties.height = +value;
        }
        break;
      case "angle":
        if (isNumber(value) || value === "") {
          updatedProperties.angle = +value;
        }
        break;
      case "left":
        if (isNumber(value) || value === "") {
          updatedProperties.left = +value;
        }
        break;
      case "top":
        if (isNumber(value) || value === "") {
          updatedProperties.top = +value;
        }
        break;
      case "fill":
        updatedProperties.fill = value;
        break;
      default:
        return;
    }
    setProperty((prev) => ({ ...prev, ...updatedProperties }));
    canvas.getActiveObject()?.set(updatedProperties);

    canvas.renderAll();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!canvas) return;

    if (event.target) {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (ev: ProgressEvent<FileReader>) {
          const img = new Image();
          img.src = ev.target?.result as string;
          img.onload = function () {
            const currentSelectedImage = canvas.getActiveObject();

            if (currentSelectedImage && user?.role) {
              let controls = {} as any;
              if (user?.role === "user") {
                controls = manageControls(
                  currentSelectedImage.type === "image"
                );
              }
              const fi = new FabricImage(img, {
                scaleX: 1,
                scaleY: 1,
                top: currentSelectedImage.top,
                left: currentSelectedImage.left,
                angle: currentSelectedImage.angle,
                width: currentSelectedImage.width,
                height: currentSelectedImage.height,
                ...controls,
              });

              canvas.remove(currentSelectedImage);
              canvas.add(fi);
            }
            canvas?.renderAll();
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const updateTemplate = () => {
    updateTemplateObject(id!, index, property);
    canvas.discardActiveObject();
  };

  const deleteObject = () => {
    removeTemplateObject(id!, index);
    canvas.discardActiveObject();
  };
  return (
    <div className="w-32 flex flex-col gap-y-2 p-2">
      <div>
        <label htmlFor="height">Height</label>
        <input
          type="text"
          name="height"
          id="height"
          placeholder="height"
          value={property.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="width">Width</label>
        <input
          type="text"
          name="width"
          id="width"
          placeholder="width"
          value={property.width}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="angle">Angle</label>
        <input
          type="text"
          name="angle"
          id="angle"
          placeholder="angle"
          value={property.angle}
          onChange={handleChange}
        />
      </div>
      {property.type === "rect" && (
        <div>
          <label htmlFor="fill">Fill</label>
          <input
            type="color"
            name="fill"
            id="fill"
            value={property.fill as string}
            onChange={handleChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="top">Top</label>
        <input
          type="text"
          name="top"
          id="top"
          placeholder="top"
          value={property.top}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="left">Left</label>
        <input
          type="text"
          name="left"
          id="left"
          placeholder="left"
          value={property.left}
          onChange={handleChange}
        />
      </div>
      {property.type === "image" && (
        <div>
          <label htmlFor="u_img" ref={fileRef}>
            <FaImage className="text-2xl" />
          </label>
          <input id="u_img" type="file" hidden onChange={updateImage} />
        </div>
      )}
      {id && (
        <>
          <button className="bg-red-500 text-white" onClick={updateTemplate}>
            Update
          </button>
          <button className="bg-red-500 text-white" onClick={deleteObject}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
