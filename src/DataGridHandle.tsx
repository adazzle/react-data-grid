import {Maybe, Position} from "./types";

export interface DataGridHandle {
    element: HTMLDivElement | null;
    scrollToColumn: (colIdx: number) => void;
    scrollToRow: (rowIdx: number) => void;
    selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
    updateRow: (position: Position) => void;
    forceUpdate: () => void;
    inEditor: () => boolean;
}