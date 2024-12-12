import {
  Canvas,
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
} from "fabric";
import { TemplateStoreTypes } from "../../store/templateStore/templateStore.types";
export interface CanvasObjectProps {
  canvas: Canvas;
}
export interface CanvasControlsProps {
  canvas: Canvas;
}

export interface CanvasViewProps {
  data?: TemplateStoreTypes;
  isNew?: boolean;
}

export interface ControlsProps
  extends Partial<
    FabricObject<
      Partial<FabricObjectProps>,
      SerializedObjectProps,
      ObjectEvents
    >
  > {
  canvas: Canvas;
  index: number;
}

export interface ObjectType
  extends Partial<
    Pick<
      FabricObjectProps,
      | "height"
      | "width"
      | "angle"
      | "top"
      | "left"
      | "scaleX"
      | "scaleY"
      | "fill"
      | "selectable"
      | "hasControls"
      | "lockMovementX"
      | "lockMovementY"
      | "lockScalingX"
      | "lockScalingY"
      | "lockRotation"
      | "backgroundColor"
    >
  > {
  type: string;
  src?: string;
}

export interface CanvasAreaProps {
  isAdd?: boolean;
  data?: TemplateStoreTypes;
}

export interface AddTemplateProps {
  canvas: Canvas;
}
