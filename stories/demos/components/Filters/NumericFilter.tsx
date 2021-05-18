enum RuleType {
  number = 1,
  range = 2,
  greaterThan = 3,
  lessThan = 4
}

type Rule =
  | { type: RuleType.range; begin: number; end: number }
  | { type: RuleType.greaterThan | RuleType.lessThan | RuleType.number; value: number };

interface NumericFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export function NumericFilter({ value, onChange }: NumericFilterProps) {
  /** Validates the input */
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const result = /Arrow|Backspace|[><,0-9-]/.test(event.key);
    if (!result) {
      event.preventDefault();
    }
  }

  const tooltipText = 'Input Methods: Range (x-y), Greater Than (>x), Less Than (<y)';

  return (
    <div className="rdg-filter-container">
      <input
        value={value}
        className="rdg-filter"
        placeholder="e.g. 3,10-15,>20"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span style={{ paddingLeft: 4, cursor: 'help' }} title={tooltipText}>
        ?
      </span>
    </div>
  );
}

export function filterNumber(value: number, filter: string) {
  for (const rule of getRules(filter)) {
    switch (rule.type) {
      case RuleType.number:
        if (rule.value === value) {
          return true;
        }
        break;
      case RuleType.greaterThan:
        if (rule.value <= value) {
          return true;
        }
        break;
      case RuleType.lessThan:
        if (rule.value >= value) {
          return true;
        }
        break;
      case RuleType.range:
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

function getRules(value: string): Rule[] {
  // handle each value with comma
  return value.split(',').map((str): Rule => {
    // handle dash
    const dashIdx = str.indexOf('-');
    if (dashIdx > 0) {
      const begin = parseInt(str.slice(0, dashIdx), 10);
      const end = parseInt(str.slice(dashIdx + 1), 10);
      return { type: RuleType.range, begin, end };
    }

    // handle greater then
    if (str.includes('>')) {
      const begin = parseInt(str.slice(str.indexOf('>') + 1), 10);
      return { type: RuleType.greaterThan, value: begin };
    }

    // handle less then
    if (str.includes('<')) {
      const end = parseInt(str.slice(str.indexOf('<') + 1), 10);
      return { type: RuleType.lessThan, value: end };
    }

    // handle normal values
    const numericValue = parseInt(str, 10);
    return { type: RuleType.number, value: numericValue };
  });
}
