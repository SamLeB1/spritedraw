import { useMemo } from "react";
import { useEditorStore } from "../store/editorStore";
import { compositeLayers } from "../utils/layers";
import type { LayerWithCel } from "../types";

export default function useCompositeLayers(
  frameId: string,
  override?: { layerId: string; cel: Uint8ClampedArray } | null,
): Uint8ClampedArray {
  const layers = useEditorStore((s) => s.layers);
  const cels = useEditorStore((s) => s.cels);
  const gridSize = useEditorStore((s) => s.gridSize);
  const getCel = useEditorStore((s) => s.getCel);

  return useMemo(() => {
    const layersWithCels: LayerWithCel[] = layers.map((layer) => ({
      ...layer,
      cel:
        override && override.layerId === layer.id
          ? override.cel
          : getCel(layer.id, frameId),
    }));
    return compositeLayers(layersWithCels, gridSize.x, gridSize.y);
  }, [layers, cels, gridSize, frameId, override, getCel]);
}
