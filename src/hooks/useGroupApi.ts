import { createContext, useContext } from 'react';
import type { GroupRow, Maybe, RowRendererProps } from '../types';

export interface GroupApi<R, SR> {
  isGroupRow: (row: R | GroupRow<R>) => row is GroupRow<R>;
  toggleGroup: (expandedGroupId: unknown) => void;
  toggleGroupSelection: (row: GroupRow<R>, checked: boolean) => void;
  getParentRow: (row: GroupRow<R>) => GroupRow<R> | undefined;
  rowRenderer?: Maybe<React.ComponentType<RowRendererProps<R | GroupRow<R>, SR>>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GroupApiContext = createContext<GroupApi<any, any> | undefined>(undefined);

export const GroupApiProvider = GroupApiContext.Provider;

export function useGroupApi<R, SR>(): GroupApi<R, SR> | undefined {
  return useContext(GroupApiContext);
}
