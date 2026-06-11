import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";
import { useEditorStore } from "../store/editorStore";

type BtnEditProps = {
  isOpen: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onClose: () => void;
};

export default function BtnEdit({
  isOpen,
  onToggle,
  onHoverOpen,
  onClose,
}: BtnEditProps) {
  const showSelectionPreview = useEditorStore((s) => s.showSelectionPreview);
  const undoHistory = useEditorStore((s) => s.undoHistory);
  const redoHistory = useEditorStore((s) => s.redoHistory);
  const clipboard = useEditorStore((s) => s.clipboard);
  const getLayer = useEditorStore((s) => s.getLayer);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const cut = useEditorStore((s) => s.cut);
  const copy = useEditorStore((s) => s.copy);
  const paste = useEditorStore((s) => s.paste);
  const clearEdit = useEditorStore((s) => s.clearEdit);
  const rotateEdit = useEditorStore((s) => s.rotateEdit);
  const flipEdit = useEditorStore((s) => s.flipEdit);
  const transformEdit = useEditorStore((s) => s.transformEdit);
  const [isRotateOpen, setIsRotateOpen] = useState(false);

  const layer = getLayer();
  const undoEnabled = undoHistory.length > 0;
  const redoEnabled = redoHistory.length > 0;
  const cutEnabled = showSelectionPreview && !layer.locked;
  const copyEnabled = showSelectionPreview;
  const pasteEnabled = clipboard && !layer.locked;
  const clearEnabled = !layer.locked;
  const rotateEnabled = !layer.locked;
  const flipEnabled = !layer.locked;

  return (
    <div>
      <button
        className={`${isOpen && "bg-zinc-600"} flex h-9 cursor-pointer items-center px-3 hover:bg-zinc-600`}
        type="button"
        onClick={onToggle}
        onMouseEnter={onHoverOpen}
      >
        <FaEdit className="mr-1" />
        <span className="text-sm">Edit</span>
      </button>
      {isOpen && (
        <div className="absolute z-1 bg-zinc-600">
          {undoEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                undo();
              }}
            >
              <span className="mr-8">Undo</span>
              <span>Ctrl+Z</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Undo</span>
              <span>Ctrl+Z</span>
            </button>
          )}
          {redoEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                redo();
              }}
            >
              <span className="mr-8">Redo</span>
              <span>Ctrl+Y</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Redo</span>
              <span>Ctrl+Y</span>
            </button>
          )}
          <hr className="my-1 text-zinc-400" />
          {cutEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                cut();
              }}
            >
              <span className="mr-8">Cut</span>
              <span>Ctrl+X</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Cut</span>
              <span>Ctrl+X</span>
            </button>
          )}
          {copyEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                copy();
              }}
            >
              <span className="mr-8">Copy</span>
              <span>Ctrl+C</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Copy</span>
              <span>Ctrl+C</span>
            </button>
          )}
          {pasteEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                paste();
              }}
            >
              <span className="mr-8">Paste</span>
              <span>Ctrl+V</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Paste</span>
              <span>Ctrl+V</span>
            </button>
          )}
          <hr className="my-1 text-zinc-400" />
          {clearEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                clearEdit();
              }}
            >
              <span className="mr-8">Clear</span>
              <span>Del</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Clear</span>
              <span>Del</span>
            </button>
          )}
          {rotateEnabled ? (
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
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(180);
                    }}
                  >
                    <span className="mr-8">180°</span>
                    <span>Shift+K</span>
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(90);
                    }}
                  >
                    <span className="mr-8">90° CW</span>
                    <span>Shift+L</span>
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
                    type="button"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(270);
                    }}
                  >
                    <span className="mr-8">90° CCW</span>
                    <span>Shift+J</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="flex w-full items-center justify-between py-1 pl-3 text-sm text-zinc-400"
              type="button"
              disabled
            >
              Rotate
              <MdArrowRight size={20} color="oklch(70.5% 0.015 286.067)" />
            </button>
          )}
          {flipEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                flipEdit("horizontal");
              }}
            >
              <span className="mr-8">Flip horizontal</span>
              <span>Shift+H</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Flip horizontal</span>
              <span>Shift+H</span>
            </button>
          )}
          {flipEnabled ? (
            <button
              className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
              type="button"
              onClick={() => {
                onClose();
                flipEdit("vertical");
              }}
            >
              <span className="mr-8">Flip vertical</span>
              <span>Shift+V</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-between px-3 py-1 text-sm text-zinc-400"
              type="button"
              disabled
            >
              <span className="mr-8">Flip vertical</span>
              <span>Shift+V</span>
            </button>
          )}
          <button
            className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-sm hover:bg-zinc-500"
            type="button"
            onClick={() => {
              onClose();
              transformEdit();
            }}
          >
            <span className="mr-8">Transform</span>
            <span>Ctrl+T</span>
          </button>
        </div>
      )}
    </div>
  );
}
