import type { RowRendererProps } from './types';
declare type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>, 'viewportColumns' | 'rowIdx'>;
interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
    'aria-rowindex': number;
    row: SR;
    bottom: number;
}
declare const _default: <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
export default _default;
