import type { SectionLabelBlock } from '../../types/diagram';

export default function SectionLabel({ block }: { block: SectionLabelBlock }) {
  return <div className="section-label">{block.text}</div>;
}
