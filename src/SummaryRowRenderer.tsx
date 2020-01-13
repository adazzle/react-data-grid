import { memo } from 'react';

import { IRowRendererProps } from './common/types';
import Row from './Row';

export default memo(Row) as <R>(props: IRowRendererProps<R>) => JSX.Element;
