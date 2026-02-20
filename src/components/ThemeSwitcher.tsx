interface Props {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeSwitcher({ isDark, onToggle }: Props) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
