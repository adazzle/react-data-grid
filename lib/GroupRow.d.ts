import type { CalculatedColumn, Position, SelectRowEvent, Omit } from './types';
export interface GroupRowRendererProps<R, SR = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
    id: string;
    groupKey: unknown;
    viewportColumns: readonly CalculatedColumn<R, SR>[];
    childRows: readonly R[];
    rowIdx: number;
    top: number;
    level: number;
    selectedCellIdx?: number;
    isExpanded: boolean;
    isRowSelected: boolean;
    selectCell: (position: Position, enableEditor?: boolean) => void;
    selectRow: (selectRowEvent: SelectRowEvent) => void;
    toggleGroup: (expandedGroupId: unknown) => void;
}
declare const _default: <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
export default _default;
