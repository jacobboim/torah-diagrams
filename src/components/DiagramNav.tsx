import { useState } from 'react';
import { useDiagramNav } from '../hooks/useDiagramData';

interface Props {
  activeId: string | null;
  onSelect: (id: string) => void;
  sidebarOpen: boolean;
}

export default function DiagramNav({ activeId, onSelect, sidebarOpen }: Props) {
  const groups = useDiagramNav();
  const [openSefer, setOpenSefer] = useState<string | null>(
    groups.length > 0 ? groups[0].sefer : null
  );

  return (
    <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-title">Torah Diagrams</div>
        <div className="sidebar-brand-sub">Interactive Visual Summaries</div>
      </div>

      {groups.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
          No diagrams found.<br />
          Add JSON files to the <code>/diagrams</code> folder.
        </div>
      )}

      {groups.map((group) => (
        <div
          key={group.sefer}
          className={`nav-group${openSefer === group.sefer ? ' open' : ''}`}
        >
          <div
            className="nav-group-label"
            onClick={() =>
              setOpenSefer((prev) =>
                prev === group.sefer ? null : group.sefer
              )
            }
          >
            <span>{group.sefer}</span>
            <span className="nav-group-arrow">▶</span>
          </div>
          <div className="nav-group-items">
            {group.parshiot.map((p) => (
              <div key={p.parshah}>
                {group.parshiot.length > 1 && (
                  <div
                    style={{
                      padding: '4px 20px 2px 24px',
                      fontSize: '0.6rem',
                      color: 'var(--text-dim)',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.parshah}
                  </div>
                )}
                {p.entries.map((entry) => (
                  <button
                    key={entry.id}
                    className={`nav-item${activeId === entry.id ? ' active' : ''}`}
                    onClick={() => onSelect(entry.id)}
                  >
                    <span className="nav-item-heb">
                      {entry.diagram.meta.hebrewTitle}
                    </span>
                    <span className="nav-item-en">
                      {entry.diagram.meta.englishTitle}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
