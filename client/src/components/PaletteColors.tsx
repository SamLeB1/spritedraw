import { useEditorStore } from "../store/editorStore";

type PaletteColorsProps = {
  colors: string[];
};

export default function PaletteColors({ colors }: PaletteColorsProps) {
  const setPrimaryColor = useEditorStore((s) => s.setPrimaryColor);
  const setSecondaryColor = useEditorStore((s) => s.setSecondaryColor);

  return (
    <div className="grid max-h-28 grid-cols-8 gap-1 overflow-x-hidden overflow-y-auto">
      {colors.map((color, i) => (
        <div
          key={i}
          className="aspect-square cursor-pointer hover:border-2 hover:border-white"
          style={{ backgroundColor: color }}
          title={color}
          onClick={() => setPrimaryColor(color)}
          onContextMenu={(e) => {
            e.preventDefault();
            setSecondaryColor(color);
          }}
        />
      ))}
    </div>
  );
}
