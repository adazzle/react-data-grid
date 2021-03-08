import type { CalculatedColumn } from '../types';
export * from './domUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';
export declare function assertIsValidKeyGetter<R>(keyGetter: unknown): asserts keyGetter is (row: R) => React.Key;
export declare function getCellStyle<R, SR>(column: CalculatedColumn<R, SR>): React.CSSProperties;
