import { useState } from 'react';
import type { EditCellState, SelectCellState } from './DataGrid';

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

  return { setLengthPosition, endPosition };
};

export default useDragOver;
