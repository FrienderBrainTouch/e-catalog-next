export type BBox = { x: number; y: number; w: number; h: number };

export type Block = {
  id: string;
  page: number;
  bbox: BBox;
  color?: string;
  label?: string;
  actions?: Array<{ type: 'goto'; page: number; bbox?: BBox; zoom?: number } | { type: 'flash' }>;
};

export type CatalogData = {
  docId: string;
  blocks: Block[];
};

export const DEFAULT_COLOR = 'rgba(255, 230, 0, 0.35)';

export function uid(prefix = 'blk'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
