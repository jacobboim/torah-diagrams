import { useMemo } from 'react';
import type { Diagram } from '../types/diagram';

// ----------------------------------------------------------------
// Vite eager-imports every JSON under data/diagrams at build time.
// Each module's default export is the parsed JSON object.
// ----------------------------------------------------------------
const diagramModules = import.meta.glob<{ default: Diagram }>(
  '../../data/diagrams/**/*.json',
  { eager: true, import: 'default' }
);

export interface DiagramEntry {
  /** Unique id from the JSON, e.g. "shaarei-orah/purim/02-yaviu-levush-malchut" */
  id: string;
  /** The full diagram data */
  diagram: Diagram;
  /** Filesystem-relative path from glob */
  path: string;
}

/**
 * Parsed + indexed registry of all diagram JSONs.
 */
export function useDiagramRegistry(): DiagramEntry[] {
  return useMemo(() => {
    const entries: DiagramEntry[] = [];
    for (const [path, mod] of Object.entries(diagramModules)) {
      const diagram = mod as unknown as Diagram;
      if (diagram && diagram.id && diagram.meta && diagram.blocks) {
        entries.push({ id: diagram.id, diagram, path });
      }
    }
    // Sort alphabetically by id
    entries.sort((a, b) => a.id.localeCompare(b.id));
    return entries;
  }, []);
}

/**
 * Group diagrams by sefer → parsha for sidebar navigation.
 */
export interface NavGroup {
  sefer: string;
  parshiot: {
    parshah: string;
    entries: DiagramEntry[];
  }[];
}

export function useDiagramNav(): NavGroup[] {
  const entries = useDiagramRegistry();

  return useMemo(() => {
    const seferMap = new Map<string, Map<string, DiagramEntry[]>>();

    for (const entry of entries) {
      const sefer = entry.diagram.meta.sefer;
      const parshah = entry.diagram.meta.parshah || 'General';

      if (!seferMap.has(sefer)) seferMap.set(sefer, new Map());
      const pMap = seferMap.get(sefer)!;
      if (!pMap.has(parshah)) pMap.set(parshah, []);
      pMap.get(parshah)!.push(entry);
    }

    const groups: NavGroup[] = [];
    for (const [sefer, pMap] of seferMap) {
      const parshiot: NavGroup['parshiot'] = [];
      for (const [parshah, items] of pMap) {
        parshiot.push({ parshah, entries: items });
      }
      groups.push({ sefer, parshiot });
    }
    return groups;
  }, [entries]);
}
