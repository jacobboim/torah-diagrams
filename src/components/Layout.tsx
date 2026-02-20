import { useState, useCallback, useEffect } from 'react';
import DiagramNav from './DiagramNav';
import DiagramRenderer from './DiagramRenderer';
import ThemeSwitcher from './ThemeSwitcher';
import { useDiagramRegistry } from '../hooks/useDiagramData';

const THEME_KEY = 'torah-diagram-dark';
const SIDEBAR_KEY = 'torah-diagram-sidebar';

function getInitialDark(): boolean {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v !== null) return v === 'true';
  } catch { /* ignore */ }
  return true; // default dark
}

function getInitialSidebar(): boolean {
  try {
    const v = localStorage.getItem(SIDEBAR_KEY);
    if (v !== null) return v === 'true';
  } catch { /* ignore */ }
  return window.innerWidth > 768;
}

export default function Layout() {
  const entries = useDiagramRegistry();
  const [activeId, setActiveId] = useState<string | null>(
    entries.length > 0 ? entries[0].id : null
  );
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebar);
  const [isDark, setIsDark] = useState(getInitialDark);

  // Apply scheme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-scheme', isDark ? 'dark' : 'light');
    try { localStorage.setItem(THEME_KEY, String(isDark)); } catch { /* */ }
  }, [isDark]);

  // Persist sidebar
  useEffect(() => {
    try { localStorage.setItem(SIDEBAR_KEY, String(sidebarOpen)); } catch { /* */ }
  }, [sidebarOpen]);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  }, []);

  const activeDiagram = entries.find((e) => e.id === activeId)?.diagram ?? null;

  return (
    <div className={`app-layout${sidebarOpen ? ' sidebar-visible' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <DiagramNav
        activeId={activeId}
        onSelect={handleSelect}
        sidebarOpen={sidebarOpen}
      />

      {/* Tap overlay to close sidebar on mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main-content">
        {activeDiagram ? (
          <DiagramRenderer diagram={activeDiagram} />
        ) : (
          <div className="home-screen">
            <div className="home-icon">📜</div>
            <div className="home-title">Torah Diagram Viewer</div>
            <div className="home-sub">
              Select a diagram from the sidebar to begin exploring.
              Add new diagram JSONs to the <code>/diagrams</code> folder and
              they will appear automatically.
            </div>
          </div>
        )}
      </main>

      <ThemeSwitcher isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
    </div>
  );
}
