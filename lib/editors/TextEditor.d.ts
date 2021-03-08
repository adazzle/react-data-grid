import type { EditorProps } from '../types';
export default function TextEditor<TRow, TSummaryRow = unknown>({ row, column, onRowChange, onClose }: EditorProps<TRow, TSummaryRow>): JSX.Element;
