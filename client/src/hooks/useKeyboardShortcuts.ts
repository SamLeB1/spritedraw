import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import useCanvasZoom from "./useCanvasZoom";

export default function useKeyboardShortcuts() {
  const showTimeline = useEditorStore((s) => s.showTimeline);
  const setShowTimeline = useEditorStore((s) => s.setShowTimeline);
  const selectTool = useEditorStore((s) => s.selectTool);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const cut = useEditorStore((s) => s.cut);
  const copy = useEditorStore((s) => s.copy);
  const paste = useEditorStore((s) => s.paste);
  const clearEdit = useEditorStore((s) => s.clearEdit);
  const exportToSpriteDrawFile = useEditorStore(
    (s) => s.exportToSpriteDrawFile,
  );
  const { zoomStepTowardsCenter, resetZoom } = useCanvasZoom();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const editable =
        tag === "input" ||
        tag === "textarea" ||
        target.contentEditable === "true";
      if (editable) return;

      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if (isCmdOrCtrl || e.altKey || e.shiftKey) {
        if (!isCmdOrCtrl && e.altKey && !e.shiftKey && key === "t") {
          e.preventDefault();
          setShowTimeline(!showTimeline);
        } else if (isCmdOrCtrl && e.altKey && !e.shiftKey && key === "n") {
          e.preventDefault();
          const modal = document.getElementById(
            "modal-new",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        } else if (isCmdOrCtrl && e.altKey && !e.shiftKey && key === "e") {
          e.preventDefault();
          const modal = document.getElementById(
            "modal-export",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        } else if (isCmdOrCtrl && e.altKey && e.shiftKey && key === "e") {
          e.preventDefault();
          const modal = document.getElementById(
            "modal-export-sprite-sheet",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        } else if (isCmdOrCtrl && e.altKey && !e.shiftKey && key === "r") {
          e.preventDefault();
          const modal = document.getElementById(
            "modal-resize",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "s") {
          e.preventDefault();
          exportToSpriteDrawFile();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "o") {
          e.preventDefault();
          const input = document.getElementById(
            "spritedraw-file-input",
          ) as HTMLInputElement;
          if (input) input.click();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "z") {
          e.preventDefault();
          undo();
        } else if (isCmdOrCtrl && !e.altKey && e.shiftKey && key === "z") {
          e.preventDefault();
          redo();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "y") {
          e.preventDefault();
          redo();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "x") {
          e.preventDefault();
          cut();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "c") {
          e.preventDefault();
          copy();
        } else if (isCmdOrCtrl && !e.altKey && !e.shiftKey && key === "v") {
          e.preventDefault();
          paste();
        }
      } else {
        if (key === "p") {
          e.preventDefault();
          selectTool("pencil");
        } else if (key === "e") {
          e.preventDefault();
          selectTool("eraser");
        } else if (key === "c") {
          e.preventDefault();
          selectTool("color-picker");
        } else if (key === "b") {
          e.preventDefault();
          selectTool("bucket");
        } else if (key === "l") {
          e.preventDefault();
          selectTool("line");
        } else if (key === "h") {
          e.preventDefault();
          selectTool("shape");
        } else if (key === "d") {
          e.preventDefault();
          selectTool("shade");
        } else if (key === "s") {
          e.preventDefault();
          selectTool("select");
        } else if (key === "m") {
          e.preventDefault();
          selectTool("move");
        } else if (key === "+" || key === "=") {
          e.preventDefault();
          zoomStepTowardsCenter(true);
        } else if (key === "-") {
          e.preventDefault();
          zoomStepTowardsCenter(false);
        } else if (key === "0") {
          e.preventDefault();
          resetZoom();
        } else if (key === "delete" || key === "backspace") {
          e.preventDefault();
          clearEdit();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showTimeline,
    setShowTimeline,
    selectTool,
    undo,
    redo,
    cut,
    copy,
    paste,
    clearEdit,
    exportToSpriteDrawFile,
    zoomStepTowardsCenter,
    resetZoom,
  ]);
}
