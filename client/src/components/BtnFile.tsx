import { useRef } from "react";
import { FaRegFile } from "react-icons/fa";
import { toast } from "sonner";
import { useEditorStore } from "../store/editorStore";
import MenuItem from "./MenuItem";
import ModalNew from "./ModalNew";
import ModalExport from "./ModalExport";
import ModalExportSpriteSheet from "./ModalExportSpriteSheet";
import type { SpriteDrawFileData } from "../types";

type BtnFileProps = {
  isOpen: boolean;
  onToggle: () => void;
  onHoverOpen: () => void;
  onClose: () => void;
};

export default function BtnFile({
  isOpen,
  onToggle,
  onHoverOpen,
  onClose,
}: BtnFileProps) {
  const importFromSpriteDrawFile = useEditorStore(
    (s) => s.importFromSpriteDrawFile,
  );
  const importImage = useEditorStore((s) => s.importImage);
  const exportToSpriteDrawFile = useEditorStore(
    (s) => s.exportToSpriteDrawFile,
  );
  const spriteDrawFileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  function handleSpriteDrawFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Your current sprite will be overwritten. Continue?")) {
      if (spriteDrawFileInputRef.current)
        spriteDrawFileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result as string;
        const parsedData: SpriteDrawFileData = JSON.parse(fileContent);
        importFromSpriteDrawFile(parsedData);
      } catch (err) {
        console.error(err);
        toast.error(
          "The imported file is invalid and may have been corrupted.",
        );
      } finally {
        if (spriteDrawFileInputRef.current)
          spriteDrawFileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      console.error(reader.error);
      toast.error("Error reading the file.");
      if (spriteDrawFileInputRef.current)
        spriteDrawFileInputRef.current.value = "";
    };

    reader.readAsText(file);
  }

  function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Your current sprite will be overwritten. Continue?")) {
      if (imageFileInputRef.current) imageFileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const dataURL = e.target?.result as string;
        importImage(dataURL);
      } catch (err) {
        console.error(err);
        toast.error("Error processing the image.");
      } finally {
        if (imageFileInputRef.current) imageFileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      console.error(reader.error);
      toast.error("Error reading the file.");
      if (imageFileInputRef.current) imageFileInputRef.current.value = "";
    };

    reader.readAsDataURL(file);
  }

  return (
    <>
      <div>
        <button
          className={`${isOpen && "bg-zinc-600"} flex h-9 cursor-pointer items-center px-3 hover:bg-zinc-600`}
          type="button"
          onClick={onToggle}
          onMouseEnter={onHoverOpen}
        >
          <FaRegFile className="mr-1" />
          <span className="text-sm">File</span>
        </button>
        {isOpen && (
          <div className="absolute z-1 bg-zinc-600">
            <MenuItem
              item="New"
              onClick={() => {
                onClose();
                const modal = document.getElementById(
                  "modal-new",
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
              shortcut="Ctrl+Alt+N"
            />
            <hr className="my-1 text-zinc-400" />
            <MenuItem
              item="Save as .spritedraw"
              onClick={() => {
                onClose();
                exportToSpriteDrawFile();
              }}
              shortcut="Ctrl+S"
            />
            <MenuItem
              item="Import .spritedraw"
              onClick={() => {
                onClose();
                spriteDrawFileInputRef.current?.click();
              }}
              shortcut="Ctrl+O"
            />
            <MenuItem
              item="Import image"
              onClick={() => {
                onClose();
                imageFileInputRef.current?.click();
              }}
            />
            <MenuItem
              item="Export"
              onClick={() => {
                onClose();
                const modal = document.getElementById(
                  "modal-export",
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
              shortcut="Ctrl+Alt+E"
            />
            <MenuItem
              item="Export sprite sheet"
              onClick={() => {
                onClose();
                const modal = document.getElementById(
                  "modal-export-sprite-sheet",
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
              shortcut="Ctrl+Alt+Shift+E"
            />
          </div>
        )}
      </div>
      <input
        ref={spriteDrawFileInputRef}
        className="hidden"
        type="file"
        accept=".spritedraw, application/json"
        onChange={handleSpriteDrawFileChange}
      />
      <input
        ref={imageFileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageFileChange}
      />
      <ModalNew />
      <ModalExport />
      <ModalExportSpriteSheet />
    </>
  );
}
