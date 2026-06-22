import { useState } from "react";
import {
  MdPlayArrow,
  MdPause,
  MdChevronLeft,
  MdChevronRight,
  MdSkipPrevious,
  MdSkipNext,
  MdSettingsInputComponent,
  MdArrowDropUp,
  MdArrowDropDown,
  MdAdd,
  MdContentCopy,
  MdDelete,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import OnionIcon from "../assets/icons/onion.svg?react";
import { useEditorStore } from "../store/editorStore";
import useAnimationPlayback from "../hooks/useAnimationPlayback";
import Frame from "./Frame";
import FpsInput from "./FpsInput";
import Tooltip from "./Tooltip";
import OnionSkinSettingsWindow from "./OnionSkinSettingsWindow";

export default function Timeline() {
  const frames = useEditorStore((s) => s.frames);
  const activeFrameId = useEditorStore((s) => s.activeFrameId);
  const isPlayingAnimation = useEditorStore((s) => s.isPlayingAnimation);
  const showOnionSkin = useEditorStore((s) => s.showOnionSkin);
  const showTimeline = useEditorStore((s) => s.showTimeline);
  const showTimelineBar = useEditorStore((s) => s.showTimelineBar);
  const setIsPlayingAnimation = useEditorStore((s) => s.setIsPlayingAnimation);
  const setShowOnionSkin = useEditorStore((s) => s.setShowOnionSkin);
  const setShowTimeline = useEditorStore((s) => s.setShowTimeline);
  const selectFrame = useEditorStore((s) => s.selectFrame);
  const newFrame = useEditorStore((s) => s.newFrame);
  const duplicateFrame = useEditorStore((s) => s.duplicateFrame);
  const deleteFrame = useEditorStore((s) => s.deleteFrame);
  const moveFrameLeft = useEditorStore((s) => s.moveFrameLeft);
  const moveFrameRight = useEditorStore((s) => s.moveFrameRight);
  useAnimationPlayback();
  const [showOnionSkinSettingsWindow, setShowOnionSkinSettingsWindow] =
    useState(false);
  const activeFrameIndex = frames.findIndex(
    (frame) => frame.id === activeFrameId,
  );

  if (!showTimeline && !showTimelineBar) return null;
  return (
    <>
      <div className={`w-full ${showTimeline && "absolute bottom-0"}`}>
        <div
          className="bg-main-semi-light flex min-h-9 cursor-pointer items-center justify-between border-t border-neutral-400 px-4 hover:bg-neutral-700"
          onClick={() => setShowTimeline(!showTimeline)}
        >
          <div className="flex items-center">
            <span className="mr-2 text-sm text-neutral-300">
              Frame: {activeFrameIndex + 1}/{frames.length}
            </span>
            <Tooltip content="Go to first frame" side="top">
              <button
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectFrame(frames[0].id);
                }}
              >
                <MdSkipPrevious size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Go to previous frame" side="top">
              <button
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeFrameIndex > 0)
                    selectFrame(frames[activeFrameIndex - 1].id);
                }}
              >
                <MdChevronLeft size={20} />
              </button>
            </Tooltip>
            {isPlayingAnimation ? (
              <Tooltip content="Pause animation" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingAnimation(false);
                  }}
                >
                  <MdPause size={20} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip content="Play animation" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (frames.length > 1) setIsPlayingAnimation(true);
                  }}
                >
                  <MdPlayArrow size={20} />
                </button>
              </Tooltip>
            )}
            <Tooltip content="Go to next frame" side="top">
              <button
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeFrameIndex < frames.length - 1)
                    selectFrame(frames[activeFrameIndex + 1].id);
                }}
              >
                <MdChevronRight size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Go to last frame" side="top">
              <button
                className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectFrame(frames[frames.length - 1].id);
                }}
              >
                <MdSkipNext size={20} />
              </button>
            </Tooltip>
          </div>
          <div className="flex items-center">
            <div
              className="mr-4 flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <FpsInput className="mr-2" />
              <Tooltip
                content={
                  showOnionSkin ? "Disable onion skin" : "Enable onion skin"
                }
                side="top"
              >
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={() => setShowOnionSkin(!showOnionSkin)}
                >
                  <OnionIcon
                    className={`h-5 w-5 ${showOnionSkin ? "text-blue-500" : "text-white"}`}
                  />
                </button>
              </Tooltip>
              <Tooltip content="Onion skin settings" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={() => setShowOnionSkinSettingsWindow(true)}
                >
                  <MdSettingsInputComponent size={20} />
                </button>
              </Tooltip>
            </div>
            <div className="flex items-center" title="Toggle timeline (Alt+T)">
              <span className="mr-1 text-sm font-medium">Timeline</span>
              {showTimeline ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
        </div>
        {showTimeline && (
          <div className="bg-neutral-900">
            <div className="flex h-10 items-center p-2">
              <Tooltip content="New frame" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={() => newFrame()}
                >
                  <MdAdd size={20} />
                </button>
              </Tooltip>
              <Tooltip content="Duplicate frame" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={duplicateFrame}
                >
                  <MdContentCopy size={20} />
                </button>
              </Tooltip>
              {frames.length > 1 ? (
                <Tooltip content="Delete frame" side="top">
                  <button
                    className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                    type="button"
                    onClick={deleteFrame}
                  >
                    <MdDelete size={20} />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip content="Delete frame" side="top">
                  <button className="rounded-lg p-1" type="button" disabled>
                    <MdDelete size={20} color="oklch(55.6% 0 0)" />
                  </button>
                </Tooltip>
              )}
              <Tooltip content="Move frame left" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={() => {
                    if (activeFrameIndex > 0) moveFrameLeft();
                  }}
                >
                  <MdArrowBack size={20} />
                </button>
              </Tooltip>
              <Tooltip content="Move frame right" side="top">
                <button
                  className="cursor-pointer rounded-lg p-1 hover:bg-neutral-600"
                  type="button"
                  onClick={() => {
                    if (activeFrameIndex < frames.length - 1) moveFrameRight();
                  }}
                >
                  <MdArrowForward size={20} />
                </button>
              </Tooltip>
            </div>
            <div className="flex gap-2 overflow-x-auto p-2">
              {frames.map((frame, i) => (
                <Frame key={frame.id} frame={frame} number={i + 1} />
              ))}
              <Tooltip content="New frame" side="top">
                <button
                  className="flex h-24 min-w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
                  type="button"
                  onClick={() => newFrame(true)}
                >
                  <MdAdd size={32} />
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      {showTimeline && showTimelineBar && <div className="h-9 w-full" />}
      {showOnionSkinSettingsWindow && (
        <OnionSkinSettingsWindow
          onClose={() => setShowOnionSkinSettingsWindow(false)}
        />
      )}
    </>
  );
}
