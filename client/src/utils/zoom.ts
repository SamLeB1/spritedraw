import {
  BASE_CANVAS_SIZE,
  BASE_PX_SIZE,
  MIN_PX_SIZE,
  MAX_PX_SIZE,
} from "../constants";

export function getFitZoomLevel(gridWidth: number, gridHeight: number) {
  const parentContainer = document.getElementById("parent-container");
  const availableSize = parentContainer
    ? Math.min(
        parentContainer.clientWidth,
        parentContainer.clientHeight,
        BASE_CANVAS_SIZE,
      )
    : BASE_CANVAS_SIZE;
  let pxSize = availableSize / Math.max(gridWidth, gridHeight);
  if (pxSize < MIN_PX_SIZE) pxSize = MIN_PX_SIZE;
  if (pxSize > MAX_PX_SIZE) pxSize = MAX_PX_SIZE;
  return pxSize / BASE_PX_SIZE;
}
