import { useMemo, useState } from 'react';
import type { EditCellState, SelectCellState } from './DataGrid';

export enum Direction {
  up,
  down
}

const useDragOver = <R>({
  selectedPosition
}: {
  selectedPosition: SelectCellState | EditCellState<R>;
}) => {
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);

  const setLengthPosition = (startIndex: number, endIndex: number) => {
    setStartIndex(startIndex);
    setEndIndex(endIndex);
  };

  const endPosition = startIndex < selectedPosition.rowIdx ? startIndex : endIndex;

  const direction = useMemo(() => {
    return startIndex <= selectedPosition.rowIdx ? Direction.up : Direction.down;
  }, [startIndex, selectedPosition.rowIdx]);

  return { setLengthPosition, endPosition, direction };
};

export default useDragOver;
