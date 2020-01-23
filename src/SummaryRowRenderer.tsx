import { memo } from 'react';

import { SummaryRendererProps } from './common/types';
import SummaryRow from './SummaryRow';

export default memo(SummaryRow) as <R>(props: SummaryRendererProps<R>) => JSX.Element;
