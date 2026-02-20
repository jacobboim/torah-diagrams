import { useState, useCallback } from 'react';
import { useDiagramNav, type ParshahGroup, type DiagramEntry } from '../hooks/useDiagramData';

interface Props {
  activeId: string | null;
  onSelect: (id: string) => void;
  sidebarOpen: boolean;
}

export default function DiagramNav({ activeId, onSelect, sidebarOpen }: Props) {
  const groups = useDiagramNav();
  
  // Track which sefers, books, and parshiot are expanded
  const [openSefers, setOpenSefers] = useState<Set<string>>(() => {
    // Default: open the first sefer
    const initial = new Set<string>();
    if (groups.length > 0) initial.add(groups[0].sefer);
    return initial;
  });
  const [openBooks, setOpenBooks] = useState<Set<string>>(new Set());
  const [openParshiot, setOpenParshiot] = useState<Set<string>>(new Set());

  const toggleSefer = useCallback((sefer: string) => {
    setOpenSefers(prev => {
      const next = new Set(prev);
      if (next.has(sefer)) next.delete(sefer);
      else next.add(sefer);
      return next;
    });
  }, []);

  const toggleBook = useCallback((bookKey: string) => {
    setOpenBooks(prev => {
      const next = new Set(prev);
      if (next.has(bookKey)) next.delete(bookKey);
      else next.add(bookKey);
      return next;
    });
  }, []);

  const toggleParshah = useCallback((parshahKey: string) => {
    setOpenParshiot(prev => {
      const next = new Set(prev);
      if (next.has(parshahKey)) next.delete(parshahKey);
      else next.add(parshahKey);
      return next;
    });
  }, []);

  // Render a single entry button
  const renderEntry = (entry: DiagramEntry) => (
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
  );

  // Render parshah group with optional expand/collapse if multiple entries
  const renderParshahGroup = (parshahGroup: ParshahGroup, keyPrefix: string, indent: number) => {
    const parshahKey = `${keyPrefix}/${parshahGroup.parshah}`;
    const isOpen = openParshiot.has(parshahKey);
    const hasMultiple = parshahGroup.entries.length > 1;
    
    if (!hasMultiple) {
      // Single entry - just show it inline with parshah name as context
      return (
        <div key={parshahKey} style={{ paddingLeft: `${indent}px` }}>
          <div className="nav-parshah-single">
            <span className="nav-parshah-label">{parshahGroup.parshah}</span>
          </div>
          {parshahGroup.entries.map(renderEntry)}
        </div>
      );
    }
    
    // Multiple entries - collapsible parshah
    return (
      <div key={parshahKey} style={{ paddingLeft: `${indent}px` }}>
        <div
          className={`nav-parshah-label clickable${isOpen ? ' open' : ''}`}
          onClick={() => toggleParshah(parshahKey)}
        >
          <span className="nav-parshah-arrow">▶</span>
          <span>{parshahGroup.parshah}</span>
          <span className="nav-count">({parshahGroup.entries.length})</span>
        </div>
        {isOpen && (
          <div className="nav-parshah-items">
            {parshahGroup.entries.map(renderEntry)}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-title">Torah Diagrams</div>
        {/* <div className="sidebar-brand-sub">Interactive Visual Summaries</div> */}
      </div>

      {groups.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
          No diagrams found.<br />
          Add JSON files to the <code>/diagrams</code> folder.
        </div>
      )}

      {groups.map((group) => {
        const isSeferOpen = openSefers.has(group.sefer);
        const hasBooks = group.books.length > 0;
        const hasDirectParshiot = group.directParshiot.length > 0;
        
        return (
          <div key={group.sefer} className={`nav-group${isSeferOpen ? ' open' : ''}`}>
            {/* Sefer Level */}
            <div
              className="nav-group-label nav-sefer"
              onClick={() => toggleSefer(group.sefer)}
            >
              <span className="nav-sefer-icon">📚</span>
              <span className="nav-sefer-name">{group.sefer}</span>
              <span className="nav-group-arrow">▶</span>
            </div>
            
            {isSeferOpen && (
              <div className="nav-group-items">
                {/* Books (if any) */}
                {hasBooks && group.books.map((bookGroup) => {
                  const bookKey = `${group.sefer}/${bookGroup.book}`;
                  const isBookOpen = openBooks.has(bookKey);
                  
                  return (
                    <div key={bookKey} className={`nav-book${isBookOpen ? ' open' : ''}`}>
                      <div
                        className="nav-book-label"
                        onClick={() => toggleBook(bookKey)}
                      >
                        <span className="nav-book-arrow">▶</span>
                        <span className="nav-book-name">{bookGroup.book}</span>
                        <span className="nav-count">
                          ({bookGroup.parshiot.reduce((sum, p) => sum + p.entries.length, 0)})
                        </span>
                      </div>
                      
                      {isBookOpen && (
                        <div className="nav-book-items">
                          {bookGroup.parshiot.map(p => renderParshahGroup(p, bookKey, 8))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Direct parshiot (no book level) */}
                {hasDirectParshiot && group.directParshiot.map(p => 
                  renderParshahGroup(p, group.sefer, 0)
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
