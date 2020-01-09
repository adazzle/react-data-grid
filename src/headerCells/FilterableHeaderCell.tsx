import React from 'react';
import { FilterRendererProps } from '../common/types';

export default function FilterableHeaderCell<R>({ value, onChange }: FilterRendererProps<R, { filterTerm: string } | undefined>) {
  return (
    <div className="rdg-filter-container">
      <input
        className="rdg-filter"
        placeholder="Search"
        value={value?.filterTerm}
        onChange={e => onChange({ filterTerm: e.target.value })}
      />
    </div>
  );
}
