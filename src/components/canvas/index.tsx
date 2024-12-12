import { useEffect, useRef, useState } from "react";
import { CanvasViewProps } from "./canvas.interface";
import { Canvas } from "fabric";
import CanvasObjects from "./canvasObjects";
import CanvasControls from "./canvasControls";
import AddTemplate from "./addTemplate";
import useAuthStore from "../../store/authStore";

export default function CanvasView({
  data = undefined,
  isNew = false,
}: CanvasViewProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const {
    auth: { user },
  } = useAuthStore();
  useEffect(() => {
    let initCanvas: Canvas;

    async function init() {
      const canvasElement = ref.current as HTMLCanvasElement;
      const containerElement = containerRef.current as HTMLDivElement;
      if (canvasElement) {
        initCanvas = new Canvas(canvasElement, {
          height: containerElement.offsetHeight,
          width: containerElement.offsetWidth,
          backgroundColor: "#111",
        });

        if (data) {
          await initCanvas.loadFromJSON(data);
        }
        initCanvas.renderAll();
        setCanvas(initCanvas);
      }
    }

    init();

    return () => {
      if (initCanvas) {
        initCanvas.dispose();
      }
    };
  }, [data]);

  return (
    <>
      {canvas && (
        <>
          {user?.role === "admin" && (
            <>
              <CanvasObjects canvas={canvas} />
              <CanvasControls canvas={canvas} />
            </>
          )}
          {isNew && <AddTemplate canvas={canvas} />}
        </>
      )}

      <div ref={containerRef} className="flex-1 flex bg-red-200 relative">
        <canvas ref={ref} />
      </div>
    </>
  );
}
