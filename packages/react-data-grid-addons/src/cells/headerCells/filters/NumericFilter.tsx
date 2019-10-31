import React from 'react';
import { Column } from 'react-data-grid';

enum RuleType {
  Number = 1,
  Range = 2,
  GreaterThen = 3,
  LessThen = 4
}

type Rule =
  | { type: RuleType.Range; begin: number; end: number }
  | { type: RuleType.GreaterThen | RuleType.LessThen | RuleType.Number; value: number };

interface ChangeEvent<R> {
  filterTerm: Rule[] | null;
  column: Column<R>;
  rawValue: string;
  filterValues: typeof filterValues;
}

interface Props<R> {
  column: Column<R>;
  onChange(event: ChangeEvent<R>): void;
}

export default function NumericFilter<R>({ column, onChange }: Props<R>) {
  /** Validates the input */
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    const result = /[><,0-9-]/.test(event.key);
    if (result === false) {
      event.preventDefault();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filters = getRules(value);
    onChange({
      filterTerm: filters.length > 0 ? filters : null,
      column,
      rawValue: value,
      filterValues
    });
  }

  const inputKey = `header-filter-${column.key as keyof R}`;

  const tooltipText = 'Input Methods: Range (x-y), Greater Than (>x), Less Than (<y)';

  return (
    <div className="rdg-filter-container">
      <input
        key={inputKey}
        className="rdg-filter"
        placeholder="e.g. 3,10-15,>20"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <span className="rdg-filter-badge" title={tooltipText}>?</span>
    </div>
  );
}


function filterValues<R>(row: R, columnFilter: { filterTerm: { [key in string]: Rule } }, columnKey: keyof R) {
  if (columnFilter.filterTerm == null) {
    return true;
  }

  // implement default filter logic
  const value = parseInt(row[columnKey] as unknown as string, 10);
  for (const ruleKey in columnFilter.filterTerm) {
    const rule = columnFilter.filterTerm[ruleKey];

    switch (rule.type) {
      case RuleType.Number:
        if (rule.value === value) {
          return true;
        }
        break;
      case RuleType.GreaterThen:
        if (rule.value <= value) {
          return true;
        }
        break;
      case RuleType.LessThen:
        if (rule.value >= value) {
          return true;
        }
        break;
      case RuleType.Range:
        if (rule.begin <= value && rule.end >= value) {
          return true;
        }
        break;
      default:
        break;
    }
  }

  return false;
}

export function getRules(value: string): Rule[] {
  if (value === '') {
    return [];
  }

  // handle each value with comma
  return value.split(',').map((str): Rule => {
    // handle dash
    const dashIdx = str.indexOf('-');
    if (dashIdx > 0) {
      const begin = parseInt(str.slice(0, dashIdx), 10);
      const end = parseInt(str.slice(dashIdx + 1), 10);
      return { type: RuleType.Range, begin, end };
    }

    // handle greater then
    if (str.includes('>')) {
      const begin = parseInt(str.slice(str.indexOf('>') + 1), 10);
      return { type: RuleType.GreaterThen, value: begin };
    }

    // handle less then
    if (str.includes('<')) {
      const end = parseInt(str.slice(str.indexOf('<') + 1), 10);
      return { type: RuleType.LessThen, value: end };
    }

    // handle normal values
    const numericValue = parseInt(str, 10);
    return { type: RuleType.Number, value: numericValue };
  });
}
