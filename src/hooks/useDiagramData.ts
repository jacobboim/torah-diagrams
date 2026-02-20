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
  /** Unique id from the JSON, e.g. "torah-ohr/shemos/terumah/01-mi-yitnecha" */
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
 * Three-level navigation structure: Sefer → Book → Parshah → Entries
 * This creates a clear hierarchy for Torah Ohr / Shemos / Terumah etc.
 */
export interface ParshahGroup {
  parshah: string;
  entries: DiagramEntry[];
}

export interface BookGroup {
  book: string;
  parshiot: ParshahGroup[];
}

export interface NavGroup {
  sefer: string;
  /** If sefer has books (like Torah Ohr with Bereishis/Shemos), they go here */
  books: BookGroup[];
  /** If sefer has no book level (like Shaarei Orah), parshiot go directly here */
  directParshiot: ParshahGroup[];
}

export function useDiagramNav(): NavGroup[] {
  const entries = useDiagramRegistry();

  return useMemo(() => {
    // Map: sefer → book → parshah → entries
    const seferMap = new Map<string, Map<string | null, Map<string, DiagramEntry[]>>>();

    for (const entry of entries) {
      const sefer = entry.diagram.meta.sefer;
      const book = entry.diagram.meta.book || null; // null if no book
      const parshah = entry.diagram.meta.parshah || 'General';

      if (!seferMap.has(sefer)) seferMap.set(sefer, new Map());
      const bookMap = seferMap.get(sefer)!;
      
      if (!bookMap.has(book)) bookMap.set(book, new Map());
      const parshahMap = bookMap.get(book)!;
      
      if (!parshahMap.has(parshah)) parshahMap.set(parshah, []);
      parshahMap.get(parshah)!.push(entry);
    }

    const groups: NavGroup[] = [];
    
    for (const [sefer, bookMap] of seferMap) {
      const books: BookGroup[] = [];
      const directParshiot: ParshahGroup[] = [];
      
      for (const [book, parshahMap] of bookMap) {
        const parshiot: ParshahGroup[] = [];
        for (const [parshah, items] of parshahMap) {
          parshiot.push({ parshah, entries: items });
        }
        
        if (book === null) {
          // No book level - add directly to sefer
          directParshiot.push(...parshiot);
        } else {
          // Has book level
          books.push({ book, parshiot });
        }
      }
      
      groups.push({ sefer, books, directParshiot });
    }
    
    // Custom sort: Torah Ohr first, then Shaarei Orah, then alphabetically
    const seferOrder = ['Torah Ohr', 'Shaarei Orah'];
    groups.sort((a, b) => {
      const aIndex = seferOrder.indexOf(a.sefer);
      const bIndex = seferOrder.indexOf(b.sefer);
      
      // If both are in the priority list, sort by their order
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      // If only a is in the list, it comes first
      if (aIndex !== -1) return -1;
      // If only b is in the list, it comes first
      if (bIndex !== -1) return 1;
      // Otherwise, sort alphabetically
      return a.sefer.localeCompare(b.sefer);
    });
    
    return groups;
  }, [entries]);
}
