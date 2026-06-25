import CanvasPreview from "./CanvasPreview";
import ZoomControls from "./ZoomControls";
import LayersMenu from "./LayersMenu";
import ColorPaletteMenu from "./ColorPaletteMenu";

export default function SideBarRight() {
  return (
    <div className="max-w-60 min-w-60 overflow-x-hidden overflow-y-auto bg-neutral-800 p-2">
      <CanvasPreview />
      <ZoomControls />
      <LayersMenu />
      <ColorPaletteMenu />
    </div>
  );
}
