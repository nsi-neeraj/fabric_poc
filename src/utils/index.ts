import { Canvas } from "fabric";

export const isNumber = (value: string): boolean => {
  return /^-?\d*\.?\d*$/.test(value);
};

export function manageControls(isImage: boolean) {
  return {
    hasControls: false,
    selectable: isImage,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
  };
}

export function currentImageAspectRatio(
  canvas: Canvas,
  width: number,
  height: number
) {
  const maxWidth = canvas.width;
  const maxHeight = canvas.height;
  const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
  return Math.min(scaleFactor, 1);
}
