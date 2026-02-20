import type { DiagramMeta } from '../types/diagram';

export default function DiagramHeader({ meta }: { meta: DiagramMeta }) {
  return (
    <div className="diagram-header">
      <div className="diagram-header-hebrew">{meta.hebrewTitle}</div>
      <div className="diagram-header-title">
        {meta.sefer}
        {meta.parshah ? ` · ${meta.parshah}` : ''}
      </div>
      {meta.subtitle && (
        <div className="diagram-header-sub">
          {meta.englishTitle} — {meta.subtitle}
        </div>
      )}
      {!meta.subtitle && (
        <div className="diagram-header-sub">{meta.englishTitle}</div>
      )}
    </div>
  );
}
