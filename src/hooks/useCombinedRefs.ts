import { useMemo } from 'react';
import { wrapRefs } from '../utils';

export function useCombinedRefs<T>(...refs: readonly React.Ref<T>[]) {
  return useMemo(
    () => wrapRefs<T>(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
