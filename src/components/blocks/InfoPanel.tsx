import { useState } from 'react';
import type { InfoPanelBlock } from '../../types/diagram';
import { sanitizeHtml } from '../../utils/sanitize';

export default function InfoPanel({ block }: { block: InfoPanelBlock }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`info-panel${open ? ' open' : ''}`}>
      <div className="info-panel-header" onClick={() => setOpen((o) => !o)}>
        <span className="info-panel-title">{block.title}</span>
        <span className="info-panel-arrow">▼</span>
      </div>
      {open && (
        <div className="info-panel-body">
          {block.intro && (
            <div
              className="prose-block"
              style={{ marginTop: 10 }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.intro) }}
            />
          )}

          {block.items.map((item, i) => (
            <div className="side-item" key={i} data-theme={item.theme}>
              <span className="side-item-heb">{item.hebrew}</span>
              <span
                className="side-item-en"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
              />
            </div>
          ))}

          {block.outro && (
            <div
              className="prose-block"
              style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12 }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.outro) }}
            />
          )}
        </div>
      )}
    </div>
  );
}
