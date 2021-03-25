import type { ReactElement } from 'react';
import { useMemo } from 'react';

import type { HeaderRowProps } from '../HeaderRow';
import HeaderRow from '../HeaderRow';
import type { FilterRowProps } from '../FilterRow';
import FilterRow from '../FilterRow';
import type { SummaryRowProps } from '../SummaryRow';
import SummaryRow from '../SummaryRow';
import type { ViewportProps } from '../Viewport';
import Viewport from '../Viewport';

export function useChildren<R, SR>(children?: ReactElement | Array<ReactElement>) {
  return useMemo((): {
    headerRow?: ReactElement<HeaderRowProps>;
    viewportRows: ReactElement<ViewportProps<R, SR>>;
    filterRow?: ReactElement<FilterRowProps>;
    summaryRows?: Array<ReactElement<SummaryRowProps<R>>>;
    emptyRowsRenderer?: ReactElement;
  } => {
    const elements = children && !Array.isArray(children) ? [children] : children;
    const headerRows = elements?.filter(c => c.type === HeaderRow);
    const filterRows = elements?.filter(c => c.type === FilterRow);
    const summaryRows = elements?.filter(c => c.type === SummaryRow);
    const viewportRows = elements?.find(c => c.type === Viewport)!; // TODO: validation
    const remainingElements = elements?.filter(c => c.type !== SummaryRow && c.type !== FilterRow);
    return {
      headerRow: headerRows && headerRows.length > 0 ? headerRows[0] : undefined,
      viewportRows,
      summaryRows,
      filterRow: filterRows && filterRows.length > 0 ? filterRows[0] : undefined,
      emptyRowsRenderer: remainingElements && remainingElements.length > 0 ? remainingElements[0] : undefined
    };
  }, [children]);
}
