export * from './domUtils';
export * from './columnUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';

export function assertIsValidKeyGetter<R>(keyGetter: unknown): asserts keyGetter is (row: R) => React.Key {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection');
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
