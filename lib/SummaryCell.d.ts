import type { CellRendererProps } from './types';
declare type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'column'>;
interface SummaryCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
    row: SR;
}
declare const _default: <R, SR>(props: SummaryCellProps<R, SR>) => JSX.Element;
export default _default;
