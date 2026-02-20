import { useState } from 'react';
import type { ItemGridBlock, GridItem } from '../../types/diagram';

function GridItemCard({
  item,
  open,
  onToggle,
}: {
  item: GridItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="grid-item"
      data-theme={item.theme}
      onClick={onToggle}
    >
      <span className="grid-item-heb">{item.hebrew}</span>
      <span className="grid-item-en">{item.english}</span>
      <span
        className="grid-item-desc"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
      {open && item.detail && (
        <div className="grid-item-detail">
          <div
            className="grid-item-detail-text"
            dangerouslySetInnerHTML={{ __html: item.detail }}
          />
        </div>
      )}
    </div>
  );
}

export default function ItemGrid({ block }: { block: ItemGridBlock }) {
  const [allOpen, setAllOpen] = useState(false);
  const cols = block.columns ?? 3;

  const handleToggle = () => setAllOpen((o) => !o);

  return (
    <div className="item-grid" data-cols={cols}>
      {block.items.map((item, i) => (
        <GridItemCard key={i} item={item} open={allOpen} onToggle={handleToggle} />
      ))}
    </div>
  );
}
