import type { CellRendererProps, SharedEditorProps, Omit } from './types';
declare type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'rowIdx' | 'row' | 'column'>;
interface EditCellProps<R, SR> extends SharedCellRendererProps<R, SR>, Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
    editorProps: SharedEditorProps<R>;
}
export default function EditCell<R, SR>({ className, column, row, rowIdx, editorProps, ...props }: EditCellProps<R, SR>): JSX.Element;
export {};
