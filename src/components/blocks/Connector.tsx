import type { ConnectorBlock, BlockTheme } from '../../types/diagram';

const themeColorMap: Record<BlockTheme, string> = {
  gold: 'rgba(245,204,85,0.5)',
  'gold-dim': 'rgba(212,160,64,0.35)',
  purple: 'rgba(200,152,232,0.5)',
  'purple-dim': 'rgba(160,100,200,0.5)',
  blue: 'rgba(64,128,192,0.55)',
  green: 'rgba(64,148,96,0.5)',
  teal: 'rgba(48,120,160,0.5)',
  red: 'rgba(200,100,64,0.5)',
};

export default function Connector({ block }: { block: ConnectorBlock }) {
  const from = themeColorMap[block.fromTheme] || themeColorMap.gold;
  const to = themeColorMap[block.toTheme] || themeColorMap.gold;

  return (
    <div className="connector">
      <div
        className="connector-line"
        style={{
          background: `linear-gradient(to bottom, ${from}, ${to})`,
        }}
      />
    </div>
  );
}
