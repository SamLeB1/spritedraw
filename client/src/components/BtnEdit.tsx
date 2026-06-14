import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";
import { useEditorStore } from "../store/editorStore";
import MenuItem from "./MenuItem";

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
          <MenuItem
            item="Undo"
            onClick={() => {
              onClose();
              undo();
            }}
            shortcut="Ctrl+Z"
            disabled={!undoEnabled}
          />
          <MenuItem
            item="Redo"
            onClick={() => {
              onClose();
              redo();
            }}
            shortcut="Ctrl+Y"
            disabled={!redoEnabled}
          />
          <hr className="my-1 text-zinc-400" />
          <MenuItem
            item="Cut"
            onClick={() => {
              onClose();
              cut();
            }}
            shortcut="Ctrl+X"
            disabled={!cutEnabled}
          />
          <MenuItem
            item="Copy"
            onClick={() => {
              onClose();
              copy();
            }}
            shortcut="Ctrl+C"
            disabled={!copyEnabled}
          />
          <MenuItem
            item="Paste"
            onClick={() => {
              onClose();
              paste();
            }}
            shortcut="Ctrl+V"
            disabled={!pasteEnabled}
          />
          <hr className="my-1 text-zinc-400" />
          <MenuItem
            item="Clear"
            onClick={() => {
              onClose();
              clearEdit();
            }}
            shortcut="Del"
            disabled={!clearEnabled}
          />
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
                  <MenuItem
                    item="180°"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(180);
                    }}
                  />
                  <MenuItem
                    item="90° CW"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(90);
                    }}
                  />
                  <MenuItem
                    item="90° CCW"
                    onClick={() => {
                      onClose();
                      setIsRotateOpen(false);
                      rotateEdit(270);
                    }}
                  />
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
          <MenuItem
            item="Flip horizontal"
            onClick={() => {
              onClose();
              flipEdit("horizontal");
            }}
            disabled={!flipEnabled}
          />
          <MenuItem
            item="Flip vertical"
            onClick={() => {
              onClose();
              flipEdit("vertical");
            }}
            disabled={!flipEnabled}
          />
          <MenuItem
            item="Transform"
            onClick={() => {
              onClose();
              transformEdit();
            }}
          />
        </div>
      )}
    </div>
  );
}
