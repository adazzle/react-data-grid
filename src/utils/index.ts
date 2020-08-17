import { GroupRow } from '../types';

export * from './domUtils';
export * from './columnUtils';
export * from './viewportUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function isGroupedRow<R>(row: R | GroupRow<R>): row is GroupRow<R> {
  return (row as GroupRow<R>).__isGroup !== undefined;
}

export function assertIsValidKey<R>(key: unknown): asserts key is keyof R {
  if (key === undefined) {
    throw new Error('Please specify the rowKey prop to use selection');
  }
}

export function wrapRefs<T>(...refs: readonly React.Ref<T>[]) {
  return (handle: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(handle);
      } else if (ref !== null) {
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        // @ts-expect-error
        ref.current = handle;
      }
    }
  };
}
