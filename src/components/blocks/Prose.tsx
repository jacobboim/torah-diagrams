import type { ProseBlock } from '../../types/diagram';

export default function Prose({ block }: { block: ProseBlock }) {
  return (
    <div
      className="prose-block"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
}
