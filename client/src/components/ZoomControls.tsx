import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useEditorStore } from "../store/editorStore";
import useCanvasZoom from "../hooks/useCanvasZoom";
import Tooltip from "./Tooltip";
import { MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL } from "../constants";

export default function ZoomControls() {
  const zoomLevel = useEditorStore((s) => s.zoomLevel);
  const { zoomStepTowardsCenter, resetZoom } = useCanvasZoom();

  return (
    <div className="mb-4 flex items-center">
      {zoomLevel > MIN_ZOOM_LEVEL ? (
        <Tooltip content="Zoom out (-)" side="bottom">
          <button
            className="mr-1 cursor-pointer rounded-lg p-1 text-neutral-300 hover:bg-neutral-600"
            type="button"
            onClick={() => zoomStepTowardsCenter(false)}
          >
            <FiZoomOut size="20" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip content="Zoom out (-)" side="bottom">
          <button
            className="mr-1 rounded-lg p-1 text-neutral-500"
            type="button"
            disabled
          >
            <FiZoomOut size="20" />
          </button>
        </Tooltip>
      )}
      <input
        className="range range-primary range-xs mr-1 w-28 bg-neutral-600"
        type="range"
      />
      {zoomLevel < MAX_ZOOM_LEVEL ? (
        <Tooltip content="Zoom in (+)" side="bottom">
          <button
            className="mr-auto cursor-pointer rounded-lg p-1 text-neutral-300 hover:bg-neutral-600"
            type="button"
            onClick={() => zoomStepTowardsCenter(true)}
          >
            <FiZoomIn size="20" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip content="Zoom in (+)" side="bottom">
          <button
            className="mr-auto rounded-lg p-1 text-neutral-500"
            type="button"
            disabled
          >
            <FiZoomIn size="20" />
          </button>
        </Tooltip>
      )}
      <Tooltip content="Reset zoom (0)" side="bottom">
        <span
          className="cursor-pointer p-1 text-xs text-neutral-300"
          onClick={resetZoom}
        >
          {Math.round(zoomLevel * 100)}%
        </span>
      </Tooltip>
    </div>
  );
}
