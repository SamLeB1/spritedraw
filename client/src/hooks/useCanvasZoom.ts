import { useEditorStore } from "../store/editorStore";
import { getFitZoomLevel } from "../utils/zoom";
import {
  BASE_PX_SIZE,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  ZOOM_FACTOR,
} from "../constants";

export default function useCanvasZoom() {
  const gridSize = useEditorStore((s) => s.gridSize);
  const panOffset = useEditorStore((s) => s.panOffset);
  const zoomLevel = useEditorStore((s) => s.zoomLevel);
  const setPanOffset = useEditorStore((s) => s.setPanOffset);
  const setZoomLevel = useEditorStore((s) => s.setZoomLevel);

  function getPxSize() {
    return BASE_PX_SIZE * zoomLevel;
  }

  function zoomTowardsCursor(
    clientX: number,
    clientY: number,
    newZoomLevel: number,
  ) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const parentContainer = document.getElementById(
      "parent-container",
    ) as HTMLDivElement;
    if (!canvas || !parentContainer) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const mouseWorldX = mouseX / getPxSize() + panOffset.x;
    const mouseWorldY = mouseY / getPxSize() + panOffset.y;

    const newPanOffset = {
      x: mouseWorldX - mouseX / (BASE_PX_SIZE * newZoomLevel),
      y: mouseWorldY - mouseY / (BASE_PX_SIZE * newZoomLevel),
    };
    const newVisibleGridSize = {
      x: Math.min(
        gridSize.x,
        parentContainer.clientWidth / (BASE_PX_SIZE * newZoomLevel),
      ),
      y: Math.min(
        gridSize.y,
        parentContainer.clientHeight / (BASE_PX_SIZE * newZoomLevel),
      ),
    };
    const maxPanOffset = {
      x: Math.max(0, gridSize.x - newVisibleGridSize.x),
      y: Math.max(0, gridSize.y - newVisibleGridSize.y),
    };
    newPanOffset.x = Math.max(0, Math.min(newPanOffset.x, maxPanOffset.x));
    newPanOffset.y = Math.max(0, Math.min(newPanOffset.y, maxPanOffset.y));

    setPanOffset(newPanOffset);
    setZoomLevel(newZoomLevel);
  }

  function zoomTowardsCenter(newZoomLevel: number) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const parentContainer = document.getElementById(
      "parent-container",
    ) as HTMLDivElement;
    if (!canvas || !parentContainer) return;

    const mouseX = canvas.width / 2;
    const mouseY = canvas.height / 2;
    const mouseWorldX = mouseX / getPxSize() + panOffset.x;
    const mouseWorldY = mouseY / getPxSize() + panOffset.y;

    const newPanOffset = {
      x: mouseWorldX - mouseX / (BASE_PX_SIZE * newZoomLevel),
      y: mouseWorldY - mouseY / (BASE_PX_SIZE * newZoomLevel),
    };
    const newVisibleGridSize = {
      x: Math.min(
        gridSize.x,
        parentContainer.clientWidth / (BASE_PX_SIZE * newZoomLevel),
      ),
      y: Math.min(
        gridSize.y,
        parentContainer.clientHeight / (BASE_PX_SIZE * newZoomLevel),
      ),
    };
    const maxPanOffset = {
      x: Math.max(0, gridSize.x - newVisibleGridSize.x),
      y: Math.max(0, gridSize.y - newVisibleGridSize.y),
    };
    newPanOffset.x = Math.max(0, Math.min(newPanOffset.x, maxPanOffset.x));
    newPanOffset.y = Math.max(0, Math.min(newPanOffset.y, maxPanOffset.y));

    setPanOffset(newPanOffset);
    setZoomLevel(newZoomLevel);
  }

  function zoomStepTowardsCursor(
    clientX: number,
    clientY: number,
    zoomIn: boolean,
  ) {
    let newZoomLevel = zoomLevel;
    if (zoomIn)
      newZoomLevel = Math.min(MAX_ZOOM_LEVEL, newZoomLevel * ZOOM_FACTOR);
    else newZoomLevel = Math.max(MIN_ZOOM_LEVEL, newZoomLevel / ZOOM_FACTOR);
    if (newZoomLevel === zoomLevel) return;
    zoomTowardsCursor(clientX, clientY, newZoomLevel);
  }

  function zoomStepTowardsCenter(zoomIn: boolean) {
    let newZoomLevel = zoomLevel;
    if (zoomIn)
      newZoomLevel = Math.min(MAX_ZOOM_LEVEL, newZoomLevel * ZOOM_FACTOR);
    else newZoomLevel = Math.max(MIN_ZOOM_LEVEL, newZoomLevel / ZOOM_FACTOR);
    if (newZoomLevel === zoomLevel) return;
    zoomTowardsCenter(newZoomLevel);
  }

  function resetZoom() {
    const newZoomLevel = getFitZoomLevel(gridSize.x, gridSize.y);
    if (newZoomLevel === zoomLevel) return;
    zoomTowardsCenter(newZoomLevel);
  }

  return {
    zoomTowardsCursor,
    zoomTowardsCenter,
    zoomStepTowardsCursor,
    zoomStepTowardsCenter,
    resetZoom,
  };
}
