import { ObjectType } from "../../components/canvas/canvas.interface";

export type CanvasObject = ObjectType;

export interface TemplateStoreTypes
  extends Partial<Omit<CanvasObject, "text" | "type" | "src">> {
  objects: Partial<CanvasObject>[];
  uid: string;
  title: string;
  background: string;
}
