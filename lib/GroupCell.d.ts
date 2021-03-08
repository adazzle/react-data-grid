import type { CalculatedColumn } from './types';
import type { GroupRowRendererProps } from './GroupRow';
declare type SharedGroupRowRendererProps<R, SR> = Pick<GroupRowRendererProps<R, SR>, 'id' | 'rowIdx' | 'groupKey' | 'childRows' | 'isExpanded' | 'isRowSelected' | 'selectRow' | 'toggleGroup'>;
interface GroupCellProps<R, SR> extends SharedGroupRowRendererProps<R, SR> {
    column: CalculatedColumn<R, SR>;
    isCellSelected: boolean;
    groupColumnIndex: number;
}
declare const _default: <R, SR>(props: GroupCellProps<R, SR>) => JSX.Element;
export default _default;
