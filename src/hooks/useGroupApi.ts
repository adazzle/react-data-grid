import { createContext, useContext } from 'react';
import type { GroupRow } from '../types';

export interface GroupApi<R> {
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
  toggleGroup: (expandedGroupId: unknown) => void;
  getParentRow: (row: GroupRow<R>) => GroupRow<R> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GroupApiContext = createContext<GroupApi<any> | undefined>(undefined);

export const GroupApiProvider = GroupApiContext.Provider;

export function useGroupApi<R>(): GroupApi<R> | undefined {
  return useContext(GroupApiContext);
}
