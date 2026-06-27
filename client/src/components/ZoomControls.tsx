import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useEditorStore } from "../store/editorStore";
import useCanvasZoom from "../hooks/useCanvasZoom";
import Tooltip from "./Tooltip";
import { MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL } from "../constants";

const LOG_MIN_ZOOM = Math.log(MIN_ZOOM_LEVEL);
const LOG_MAX_ZOOM = Math.log(MAX_ZOOM_LEVEL);

export default function ZoomControls() {
  const zoomLevel = useEditorStore((s) => s.zoomLevel);
  const { zoomStepTowardsCenter, zoomTowardsCenter, resetZoom } =
    useCanvasZoom();

  // Map zoom level onto a 0..1 slider position using a logarithmic scale so
  // that each step covers a constant zoom ratio.
  const sliderValue =
    zoomLevel === MIN_ZOOM_LEVEL
      ? 0
      : zoomLevel === MAX_ZOOM_LEVEL
        ? 1
        : (Math.log(zoomLevel) - LOG_MIN_ZOOM) / (LOG_MAX_ZOOM - LOG_MIN_ZOOM);

  function handleSliderChange(value: number) {
    const newZoomLevel =
      value === 0
        ? MIN_ZOOM_LEVEL
        : value === 1
          ? MAX_ZOOM_LEVEL
          : Math.exp(LOG_MIN_ZOOM + value * (LOG_MAX_ZOOM - LOG_MIN_ZOOM));
    if (newZoomLevel === zoomLevel) return;
    zoomTowardsCenter(newZoomLevel);
  }

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
        min={0}
        max={1}
        step={0.001}
        value={sliderValue}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
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
