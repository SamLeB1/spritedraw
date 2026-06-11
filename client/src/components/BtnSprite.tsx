import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdArrowRight } from "react-icons/md";
import { useEditorStore } from "../store/editorStore";
import ModalResize from "./ModalResize";

type BtnSpriteProps = {
  isOpen: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onClose: () => void;
};

export default function BtnSprite({
  isOpen,
  onToggle,
  onHoverOpen,
  onClose,
}: BtnSpriteProps) {
  const showSelectionPreview = useEditorStore((s) => s.showSelectionPreview);
  const cropToSelection = useEditorStore((s) => s.cropToSelection);
  const trimCanvas = useEditorStore((s) => s.trimCanvas);
  const rotateCanvas = useEditorStore((s) => s.rotateCanvas);
  const flipCanvas = useEditorStore((s) => s.flipCanvas);
  const [isRotateOpen, setIsRotateOpen] = useState(false);
  const cropEnabled = showSelectionPreview;

  return (
    <>
      <div>
        <button
          className={`${isOpen && "bg-zinc-600"} flex h-9 cursor-pointer items-center px-3 hover:bg-zinc-600`}
          type="button"
          onClick={onToggle}
          onMouseEnter={onHoverOpen}
        >
          <FaRegImage className="mr-1" />
          <span className="text-sm">Sprite</span>
        </button>
        {isOpen && (
          <div className="absolute z-1 bg-zinc-600">
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                const modal = document.getElementById(
                  "modal-resize",
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
            >
              <span className="mr-8">Resize</span>
              <span>Ctrl+R</span>
            </button>
            {cropEnabled ? (
              <button
                className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
                type="button"
                onClick={() => {
                  onClose();
                  cropToSelection();
                }}
              >
                <span className="mr-8">Crop</span>
                <span>Ctrl+Shift+X</span>
              </button>
            ) : (
              <button
                className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
                type="button"
                disabled
              >
                <span className="mr-8">Crop</span>
                <span>Ctrl+Shift+X</span>
              </button>
            )}
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                trimCanvas();
              }}
            >
              <span className="mr-8">Trim</span>
              <span>Ctrl+Shift+T</span>
            </button>
            <hr className="my-1 text-zinc-400" />
            <div
              className="relative"
              onMouseEnter={() => setIsRotateOpen(true)}
              onMouseLeave={() => setIsRotateOpen(false)}
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between py-1 pl-3 text-sm hover:bg-zinc-500"
                type="button"
              >
                Rotate
                <MdArrowRight size={20} />
              </button>
              {isRotateOpen && (
                <div className="absolute top-0 left-full w-max bg-zinc-600">
                  <button
                    className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(180);
                    }}
                  >
                    180°
                  </button>
                  <button
                    className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(90);
                    }}
                  >
                    90° CW
                  </button>
                  <button
                    className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(270);
                    }}
                  >
                    90° CCW
                  </button>
                </div>
              )}
            </div>
            <button
              className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                flipCanvas("horizontal");
              }}
            >
              Flip horizontal
            </button>
            <button
              className="block w-full cursor-pointer px-3 py-1 text-start text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                flipCanvas("vertical");
              }}
            >
              Flip vertical
            </button>
          </div>
        )}
      </div>
      <ModalResize />
    </>
  );
}
