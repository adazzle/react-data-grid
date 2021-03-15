import type { ReactElement } from 'react';
import { useMemo } from 'react';

import type { FilterRowProps } from '../FilterRow';
import FilterRow from '../FilterRow';
import type { SummaryRowProps } from '../SummaryRow';
import SummaryRow from '../SummaryRow';

export function useChildren<R>(children?: ReactElement | Array<ReactElement>) {
  return useMemo((): {
    filterRow?: ReactElement<FilterRowProps>;
    summaryRows?: Array<ReactElement<SummaryRowProps<R>>>;
    emptyRowsRenderer?: ReactElement;
  } => {
    const elements = children && !Array.isArray(children) ? [children] : children;
    const filterRows = elements?.filter(c => c.type === FilterRow);
    const summaryRows = elements?.filter(c => c.type === SummaryRow);
    const remainingElements = elements?.filter(c => c.type !== SummaryRow && c.type !== FilterRow);
    return {
      summaryRows,
      filterRow: filterRows && filterRows.length > 0 ? filterRows[0] : undefined,
      emptyRowsRenderer: remainingElements && remainingElements.length > 0 ? remainingElements[0] : undefined
    };
  }, [children]);
}
