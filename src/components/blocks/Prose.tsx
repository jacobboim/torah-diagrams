import type { ProseBlock } from '../../types/diagram';
import { sanitizeHtml } from '../../utils/sanitize';

export default function Prose({ block }: { block: ProseBlock }) {
  return (
    <div
      className="prose-block"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.content) }}
    />
  );
}
