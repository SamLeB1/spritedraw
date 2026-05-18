import { useState } from "react";
import FloatingWindow from "./FloatingWindow";

type OnionSkinSettingsWindowProps = {
  onClose: () => void;
};

export default function OnionSkinSettingsWindow({
  onClose,
}: OnionSkinSettingsWindowProps) {
  const [prevOnionFrameCount, setPrevOnionFrameCount] = useState(1);
  const [nextOnionFrameCount, setNextOnionFrameCount] = useState(1);
  const [onionSkinOpacity, setOnionSkinOpacity] = useState(0.3);
  const [onionSkinOpacityStep, setOnionSkinOpacityStep] = useState(0.1);
  const [onionSkinDisplay, setOnionSkinDisplay] = useState<"below" | "above">(
    "below",
  );

  return (
    <FloatingWindow title="Onion Skin Settings" onClose={onClose}>
      <>
        <div className="mb-3 flex items-center">
          <label className="label mr-4 text-sm text-neutral-300">
            Previous Frames
            <input
              className="input input-xs ml-1 w-12 pl-2 text-white"
              type="number"
              value={prevOnionFrameCount}
              onChange={(e) => setPrevOnionFrameCount(Number(e.target.value))}
            />
          </label>
          <label className="label text-sm text-neutral-300">
            Next Frames
            <input
              className="input input-xs ml-1 w-12 pl-2 text-white"
              type="number"
              value={nextOnionFrameCount}
              onChange={(e) => setNextOnionFrameCount(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <label className="label text-sm" htmlFor="onion-skin-opacity">
              Opacity
            </label>
            <span className="text-sm">
              {Math.round(onionSkinOpacity * 100)}%
            </span>
          </div>
          <input
            className="range range-xs range-primary"
            id="onion-skin-opacity"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={onionSkinOpacity}
            onChange={(e) => setOnionSkinOpacity(Number(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <div className="mb-1 flex items-center justify-between">
            <label className="label text-sm" htmlFor="onion-skin-opacity-step">
              Opacity Step
            </label>
            <span className="text-sm">
              {Math.round(onionSkinOpacityStep * 100)}%
            </span>
          </div>
          <input
            className="range range-xs range-primary"
            id="onion-skin-opacity-step"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={onionSkinOpacityStep}
            onChange={(e) => setOnionSkinOpacityStep(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center">
          <label className="label mr-4 text-sm text-neutral-300">
            <input
              className={`checkbox checkbox-primary checkbox-xs rounded-none border-2 ${onionSkinDisplay !== "below" && "border-neutral-500"}`}
              type="checkbox"
              checked={onionSkinDisplay === "below"}
              onChange={() => setOnionSkinDisplay("below")}
            />
            Show Below
          </label>
          <label className="label text-sm text-neutral-300">
            <input
              className={`checkbox checkbox-primary checkbox-xs rounded-none border-2 ${onionSkinDisplay !== "above" && "border-neutral-500"}`}
              type="checkbox"
              checked={onionSkinDisplay === "above"}
              onChange={() => setOnionSkinDisplay("above")}
            />
            Show Above
          </label>
        </div>
      </>
    </FloatingWindow>
  );
}
