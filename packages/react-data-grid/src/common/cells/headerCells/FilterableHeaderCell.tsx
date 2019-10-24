import React, { useState } from 'react';
import { FilterRendererProps } from '../../types';

export default function FilterableHeaderCell<R>({ column, onChange }: FilterRendererProps<R>) {
  const [filterTerm, setFilterTerm] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFilterTerm(value);
    if (onChange) {
      onChange({ filterTerm: value, column });
    }
  }

  return (
    <div className="rdg-filter-container">
      <input
        key={`header-filter-${column.key as keyof R}`}
        className="rdg-filter"
        placeholder="Search"
        value={filterTerm}
        onChange={handleChange}
      />
    </div>
  );
}
