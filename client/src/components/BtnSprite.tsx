import { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdArrowRight } from "react-icons/md";
import { useEditorStore } from "../store/editorStore";
import MenuItem from "./MenuItem";
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
            <MenuItem
              item="Resize"
              onClick={() => {
                onClose();
                const modal = document.getElementById(
                  "modal-resize",
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
              shortcut="Ctrl+Alt+R"
            />
            <MenuItem
              item="Crop"
              onClick={() => {
                onClose();
                cropToSelection();
              }}
              disabled={!cropEnabled}
            />
            <MenuItem
              item="Trim"
              onClick={() => {
                onClose();
                trimCanvas();
              }}
            />
            <hr className="my-1 text-zinc-400" />
            <div
              className="relative"
              onMouseEnter={() => setIsRotateOpen(true)}
              onMouseLeave={() => setIsRotateOpen(false)}
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between py-1 pl-6 text-sm hover:bg-zinc-500"
                type="button"
              >
                Rotate
                <MdArrowRight size={20} />
              </button>
              {isRotateOpen && (
                <div className="absolute top-0 left-full w-max bg-zinc-600">
                  <MenuItem
                    item="180°"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(180);
                    }}
                  />
                  <MenuItem
                    item="90° CW"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(90);
                    }}
                  />
                  <MenuItem
                    item="90° CCW"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateCanvas(270);
                    }}
                  />
                </div>
              )}
            </div>
            <MenuItem
              item="Flip horizontal"
              onClick={() => {
                onClose();
                flipCanvas("horizontal");
              }}
            />
            <MenuItem
              item="Flip vertical"
              onClick={() => {
                onClose();
                flipCanvas("vertical");
              }}
            />
          </div>
        )}
      </div>
      <ModalResize />
    </>
  );
}
