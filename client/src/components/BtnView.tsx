import { FaEye } from "react-icons/fa";
import { useEditorStore } from "../store/editorStore";
import useCanvasZoom from "../hooks/useCanvasZoom";
import MenuItem from "./MenuItem";
import { MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL } from "../constants";

type BtnViewProps = {
  isOpen: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onClose: () => void;
};

export default function BtnView({
  isOpen,
  onToggle,
  onHoverOpen,
  onClose,
}: BtnViewProps) {
  const zoomLevel = useEditorStore((s) => s.zoomLevel);
  const showTimeline = useEditorStore((s) => s.showTimeline);
  const showTimelineBar = useEditorStore((s) => s.showTimelineBar);
  const showInfo = useEditorStore((s) => s.showInfo);
  const setShowTimeline = useEditorStore((s) => s.setShowTimeline);
  const setShowTimelineBar = useEditorStore((s) => s.setShowTimelineBar);
  const setShowInfo = useEditorStore((s) => s.setShowInfo);
  const { zoomStepTowardsCenter, resetZoom } = useCanvasZoom();

  return (
    <div>
      <button
        className={`${isOpen && "bg-zinc-600"} flex h-9 cursor-pointer items-center px-3 hover:bg-zinc-600`}
        type="button"
        onClick={onToggle}
        onMouseEnter={onHoverOpen}
      >
        <FaEye className="mr-1" />
        <span className="text-sm">View</span>
      </button>
      {isOpen && (
        <div className="absolute z-1 bg-zinc-600">
          <MenuItem
            item="Zoom in"
            onClick={() => {
              onClose();
              zoomStepTowardsCenter(true);
            }}
            shortcut="+"
            disabled={zoomLevel >= MAX_ZOOM_LEVEL}
          />
          <MenuItem
            item="Zoom out"
            onClick={() => {
              onClose();
              zoomStepTowardsCenter(false);
            }}
            shortcut="-"
            disabled={zoomLevel <= MIN_ZOOM_LEVEL}
          />
          <MenuItem
            item="Zoom reset"
            onClick={() => {
              onClose();
              resetZoom();
            }}
            shortcut="0"
          />
          <hr className="my-1 text-zinc-400" />
          <MenuItem
            item="Timeline"
            onClick={() => {
              onClose();
              setShowTimeline(!showTimeline);
            }}
            shortcut="Alt+T"
            checked={showTimeline}
          />
          <MenuItem
            item="Show timeline bar"
            onClick={() => {
              onClose();
              setShowTimelineBar(!showTimelineBar);
            }}
            checked={showTimelineBar}
          />
          <MenuItem
            item="Show info"
            onClick={() => {
              onClose();
              setShowInfo(!showInfo);
            }}
            shortcut="I"
            checked={showInfo}
          />
        </div>
      )}
    </div>
  );
}
