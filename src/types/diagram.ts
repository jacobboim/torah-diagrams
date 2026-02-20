// ============================================================
// Diagram JSON Schema — TypeScript Definitions
// ============================================================
// Each diagram is a flat list of "blocks" rendered top-to-bottom.
// The viewer maps each block.type to a React component.
// ============================================================

// --------------- Color Themes ---------------
export type BlockTheme =
  | 'gold'
  | 'gold-dim'
  | 'purple'
  | 'purple-dim'
  | 'blue'
  | 'green'
  | 'teal'
  | 'red';

// --------------- Badge ---------------
export interface Badge {
  label: string;
  variant: 'primary' | 'secondary';
}

// --------------- Detail Box (inside LevelCard) ---------------
export interface DetailBox {
  title: string;
  /** Supports inline HTML: <span class="hl">, <span class="heb">, <b> */
  content: string;
}

// --------------- Block: LevelCard ---------------
export interface LevelCardBlock {
  type: 'level-card';
  theme: BlockTheme;
  number: string;
  label: string;
  hebrew: string;
  english: string;
  /** Supports inline HTML for Hebrew spans, bold, etc. */
  tagline: string;
  badges?: Badge[];
  details?: DetailBox[];
}

// --------------- Block: Connector ---------------
export interface ConnectorBlock {
  type: 'connector';
  fromTheme: BlockTheme;
  toTheme: BlockTheme;
}

// --------------- Block: SectionLabel ---------------
export interface SectionLabelBlock {
  type: 'section-label';
  text: string;
}

// --------------- Block: Verse ---------------
export interface VerseBlock {
  type: 'verse';
  text: string;
  reference?: string;
}

// --------------- Block: ItemGrid ---------------
export interface GridItem {
  hebrew: string;
  english: string;
  theme: BlockTheme;
  description: string;
  /** Expanded detail shown on click. Supports inline HTML. */
  detail?: string;
}

export interface ItemGridBlock {
  type: 'item-grid';
  columns?: number; // default 3
  items: GridItem[];
}

// --------------- Block: InfoPanel ---------------
export interface SideItem {
  theme: BlockTheme;
  hebrew: string;
  /** Supports inline HTML for bold, line-breaks, etc. */
  content: string;
}

export interface InfoPanelBlock {
  type: 'info-panel';
  title: string;
  /** Optional prose intro above the items */
  intro?: string;
  items: SideItem[];
  /** Optional prose outro below the items */
  outro?: string;
}

// --------------- Block: ParableGrid ---------------
export interface Parable {
  icon: string;
  title: string;
  body: string;
}

export interface ParableGridBlock {
  type: 'parable-grid';
  items: Parable[];
}

// --------------- Block: ContrastTable ---------------
export interface TableColumn {
  key: string;
  label: string;
  theme?: BlockTheme;
}

export interface ContrastTableBlock {
  type: 'contrast-table';
  title?: string;
  columns: TableColumn[];
  rows: Record<string, string>[];
}

// --------------- Block: Prose ---------------
export interface ProseBlock {
  type: 'prose';
  /** Supports inline HTML: <b>, <br>, color spans */
  content: string;
}

// --------------- Union of All Blocks ---------------
export type DiagramBlock =
  | LevelCardBlock
  | ConnectorBlock
  | SectionLabelBlock
  | VerseBlock
  | ItemGridBlock
  | InfoPanelBlock
  | ParableGridBlock
  | ContrastTableBlock
  | ProseBlock;

// --------------- Diagram Meta ---------------
export interface DiagramMeta {
  sefer: string;
  book?: string;
  parshah: string;
  hebrewTitle: string;
  englishTitle: string;
  subtitle?: string;
  /** Relative path to the source discourse JSON */
  sourceDiscourse?: string;
}

// --------------- Root Diagram Document ---------------
export interface Diagram {
  /** Unique id matching folder path, e.g. "shaarei-orah/purim/02-yaviu" */
  id: string;
  meta: DiagramMeta;
  blocks: DiagramBlock[];
}
