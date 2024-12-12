import { FabricObject } from "fabric";
import { AddTemplateProps } from "./canvas.interface";
import useTemplatesStore from "../../store/templateStore";
import { faker } from "@faker-js/faker";
import { TemplateStoreTypes } from "../../store/templateStore/templateStore.types";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export default function AddTemplate({ canvas }: AddTemplateProps) {
  const navigate = useNavigate();
  const { addTemplate } = useTemplatesStore();
  const onClickHandler = useCallback(() => {
    const canvasData = canvas.toJSON();
    const canvasJSON: TemplateStoreTypes = {
      uid: faker.string.uuid(),
      title: faker.internet.username(),
      objects: [],
      background: canvasData.background,
    } as TemplateStoreTypes;

    canvasData.objects.forEach((item: FabricObject & { src?: string }) => {
      canvasJSON.objects.push({
        angle: item.angle,
        fill: item.fill,
        height: item.height,
        width: item.width,
        left: item.left,
        top: item.top,
        scaleX: item.scaleX,
        scaleY: item.scaleY,
        type: item.type,
        src: item?.src || "",
      });
    });

    addTemplate([canvasJSON]);
    navigate(-1);
  }, [addTemplate, canvas, navigate]);

  return (
    <button
      onClick={onClickHandler}
      className="h-16 w-16 bg-lime-500 absolute right-4 bottom-4 grid place-items-center rounded-full cursor-pointer z-10"
    >
      Add
    </button>
  );
}
