import type { Diagram, DiagramBlock } from '../types/diagram';
import DiagramHeader from './DiagramHeader';
import {
  LevelCard,
  Connector,
  SectionLabel,
  Verse,
  ItemGrid,
  InfoPanel,
  ParableGrid,
  ContrastTable,
  Prose,
} from './blocks';

function renderBlock(block: DiagramBlock, index: number) {
  switch (block.type) {
    case 'level-card':
      return <LevelCard key={index} block={block} />;
    case 'connector':
      return <Connector key={index} block={block} />;
    case 'section-label':
      return <SectionLabel key={index} block={block} />;
    case 'verse':
      return <Verse key={index} block={block} />;
    case 'item-grid':
      return <ItemGrid key={index} block={block} />;
    case 'info-panel':
      return <InfoPanel key={index} block={block} />;
    case 'parable-grid':
      return <ParableGrid key={index} block={block} />;
    case 'contrast-table':
      return <ContrastTable key={index} block={block} />;
    case 'prose':
      return <Prose key={index} block={block} />;
    default:
      return null;
  }
}

export default function DiagramRenderer({ diagram }: { diagram: Diagram }) {
  return (
    <>
      <DiagramHeader meta={diagram.meta} />
      <div className="diagram-page">
        <p className="click-hint">
          ↓ Click any card to expand · Scrolling top → bottom = highest → lowest ↓
        </p>
        {diagram.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </>
  );
}
