import React from 'react';
import { Column, RowData } from 'react-data-grid';

enum RuleType {
  Number = 1,
  Range = 2,
  GreaterThen = 3,
  LessThen = 4
}

type Rule =
  | { type: RuleType.Range; begin: number; end: number }
  | { type: RuleType.GreaterThen | RuleType.LessThen | RuleType.Number; value: number };

interface ChangeEvent {
  filterTerm: Rule[] | null;
  column: Column;
  rawValue: string;
  filterValues: typeof filterValues;
}

interface Props {
  column: Column;
  onChange(event: ChangeEvent): void;
}

export default function NumericFilter({ column, onChange }: Props) {
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

  const inputKey = `header-filter-${column.key}`;
  const columnStyle: React.CSSProperties = {
    float: 'left',
    marginRight: 5,
    maxWidth: '80%'
  };
  const badgeStyle: React.CSSProperties = {
    cursor: 'help'
  };

  const tooltipText = 'Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)';

  return (
    <div>
      <div style={columnStyle}>
        <input
          key={inputKey}
          placeholder="e.g. 3,10-15,>20"
          className="form-control input-sm"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="input-sm">
        <span className="badge" style={badgeStyle} title={tooltipText}>?</span>
      </div>
    </div>
  );
}


function filterValues(row: RowData, columnFilter: { filterTerm: { [key in string]: Rule } }, columnKey: string) {
  if (columnFilter.filterTerm == null) {
    return true;
  }

  // implement default filter logic
  const value = parseInt(row[columnKey] as string, 10);
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
    const isRangeStr = /^-?\d+--?\d+$/.test(str);
    if (isRangeStr) {
      let begin = parseInt(str.match(/^-?\d+/)![0], 10);
      let end = parseInt(str.match(/-+\d+$/)![0].slice(1), 10);
      if (begin > end) {
        end = [begin, begin = end][0]; // swap the values of Begin and End
      }
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
