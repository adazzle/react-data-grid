import { memo } from 'react';

import { RowRendererProps } from './common/types';
import Row from './Row';

export default memo(Row) as <R>(props: RowRendererProps<R>) => JSX.Element;
