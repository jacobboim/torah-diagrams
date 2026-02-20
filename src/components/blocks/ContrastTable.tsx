import type { ContrastTableBlock, BlockTheme } from '../../types/diagram';

const themeAccent: Record<BlockTheme, string> = {
  gold: 'var(--gold-bright)',
  'gold-dim': 'var(--gold-dim)',
  purple: 'var(--purple-bright)',
  'purple-dim': '#c090e0',
  blue: 'var(--blue-bright)',
  green: 'var(--green-bright)',
  teal: 'var(--teal-bright)',
  red: 'var(--red-bright)',
};

export default function ContrastTable({ block }: { block: ContrastTableBlock }) {
  return (
    <div className="contrast-table-wrap">
      <table className="contrast-table">
        <thead>
          <tr>
            {block.columns.map((col) => (
              <th
                key={col.key}
                style={col.theme ? { color: themeAccent[col.theme] } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {block.columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
