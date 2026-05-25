import { useEditorStore } from "../store/editorStore";
import Tooltip from "./Tooltip";

export default function EditModePicker() {
  const editAllLayers = useEditorStore((s) => s.editAllLayers);
  const editAllFrames = useEditorStore((s) => s.editAllFrames);
  const setEditAllLayers = useEditorStore((s) => s.setEditAllLayers);
  const setEditAllFrames = useEditorStore((s) => s.setEditAllFrames);

  return (
    <div className="flex min-h-10 items-center bg-neutral-800 px-4">
      <Tooltip
        content="Multi-edit with move tool/edit operations"
        side="bottom"
      >
        <label className="label mr-4 text-sm text-neutral-300">
          <input
            className={`checkbox checkbox-primary checkbox-xs rounded-none border-2 ${!editAllLayers && "border-neutral-500"}`}
            type="checkbox"
            checked={editAllLayers}
            onChange={() => setEditAllLayers(!editAllLayers)}
          />
          Edit all layers
        </label>
      </Tooltip>
      <Tooltip
        content="Multi-edit with move tool/edit operations"
        side="bottom"
      >
        <label className="label text-sm text-neutral-300">
          <input
            className={`checkbox checkbox-primary checkbox-xs rounded-none border-2 ${!editAllFrames && "border-neutral-500"}`}
            type="checkbox"
            checked={editAllFrames}
            onChange={() => setEditAllFrames(!editAllFrames)}
          />
          Edit all frames
        </label>
      </Tooltip>
    </div>
  );
}
