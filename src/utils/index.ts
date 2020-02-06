export * from './domUtils';
export * from './columnUtils';
export * from './viewportUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function assertIsValidKey<R>(key: unknown): asserts key is keyof R {
  if (key === undefined) {
    throw new Error('Please specify the rowKey prop to use selection');
  }
}
