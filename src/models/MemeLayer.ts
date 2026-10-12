export type LayerType = "text" | "sticker" | "image";

export interface MemeLayer {
  id: string;
  memeId: string;
  type: LayerType;
  position: { x: number; y: number; width: number; height: number; rotation: number };
  properties: Record<string, unknown>;
  zIndex: number;
}
