import type { ParableGridBlock } from '../../types/diagram';
import { sanitizeHtml } from '../../utils/sanitize';

export default function ParableGrid({ block }: { block: ParableGridBlock }) {
  return (
    <div className="parables-grid">
      {block.items.map((p, i) => (
        <div className="parable-card" key={i}>
          <span className="parable-icon">{p.icon}</span>
          <span className="parable-title">{p.title}</span>
          <div
            className="parable-body"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.body) }}
          />
        </div>
      ))}
    </div>
  );
}
