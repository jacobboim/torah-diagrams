import type { VerseBlock } from '../../types/diagram';

export default function Verse({ block }: { block: VerseBlock }) {
  return (
    <div className="verse-block">
      <span dangerouslySetInnerHTML={{ __html: block.text }} />
      {block.reference && <span className="verse-ref">— {block.reference}</span>}
    </div>
  );
}
