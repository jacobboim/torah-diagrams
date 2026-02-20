import { useState } from 'react';
import type { LevelCardBlock } from '../../types/diagram';
import { sanitizeHtml } from '../../utils/sanitize';

export default function LevelCard({ block }: { block: LevelCardBlock }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="level-card"
      data-theme={block.theme}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="level-inner">
        <div className="level-top">
          <div className="level-text">
            <div className="level-number">
              {block.number} · {block.label}
            </div>
            <div className="level-hebrew">{block.hebrew}</div>
            <div className="level-english">{block.english}</div>
            <div
              className="level-tagline"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.tagline) }}
            />
          </div>

          {block.badges && block.badges.length > 0 && (
            <div className="level-badge">
              {block.badges.map((b, i) => (
                <span key={i} className={`badge badge-${b.variant}`}>
                  {b.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {open && block.details && block.details.length > 0 && (
          <div className="level-details">
            <div className="detail-grid">
              {block.details.map((d, i) => (
                <div className="detail-box" key={i}>
                  <div className="detail-box-title">{d.title}</div>
                  <div
                    className="detail-box-content"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(d.content) }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
