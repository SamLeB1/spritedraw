import tinycolor from "tinycolor2";
import { useEditorStore } from "../store/editorStore";

type PaletteColorsProps = {
  colors: string[];
};

export default function PaletteColors({ colors }: PaletteColorsProps) {
  const primaryColor = useEditorStore((s) => s.primaryColor);
  const secondaryColor = useEditorStore((s) => s.secondaryColor);
  const setPrimaryColor = useEditorStore((s) => s.setPrimaryColor);
  const setSecondaryColor = useEditorStore((s) => s.setSecondaryColor);

  return (
    <div className="grid max-h-28 grid-cols-8 gap-1 overflow-x-hidden overflow-y-auto">
      {colors.map((color, i) => {
        const isLight = tinycolor(color).isLight();
        const indicatorColor = isLight ? "black" : "white";
        const isPrimary = tinycolor.equals(color, primaryColor);
        const isSecondary = tinycolor.equals(color, secondaryColor);

        return (
          <div
            key={i}
            className={`relative aspect-square cursor-pointer hover:border ${
              isLight ? "hover:border-black" : "hover:border-white"
            }`}
            style={{ backgroundColor: color }}
            title={color}
            onClick={() => setPrimaryColor(color)}
            onContextMenu={(e) => {
              e.preventDefault();
              setSecondaryColor(color);
            }}
          >
            {isPrimary && (
              <div
                className="absolute top-0 left-0 h-0 w-0"
                style={{
                  borderTop: `0.5rem solid ${indicatorColor}`,
                  borderRight: "0.5rem solid transparent",
                }}
              />
            )}
            {isSecondary && (
              <div
                className="absolute right-0 bottom-0 h-0 w-0"
                style={{
                  borderBottom: `0.5rem solid ${indicatorColor}`,
                  borderLeft: "0.5rem solid transparent",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
