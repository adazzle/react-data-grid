import { Observable} from 'rxjs/Observable';
import { createActions } from '../state/RxState';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';

import initialState from '../state/CellState';

export const cellActions = createActions([
  'moveUp',
  'moveDown',
  'moveRight',
  'moveLeft',
  'selectCell',
  'setIsEditing'
]);

const isCellWithinBounds = ({idx, rowIdx}) => idx >= 0 && rowIdx >= 0;

const moveCellBy = (state, cellOffset, rowOffset) => {
  const {idx, rowIdx} = state.selectedPosition;
  const newCellPosition = { rowIdx: rowIdx + rowOffset, idx: idx + cellOffset };
  const selectedPosition = {
    ...state.selectedPosition,
    ...newCellPosition
  };
  return isCellWithinBounds(newCellPosition) ? { ...state, ...{ selectedPosition }, ...{lastSelectedPosition: state.selectedPosition} } : state;
};

const selectCell = (newSelected, state) => {
  return {
    ...state,
    ...{ selectedPosition: newSelected },
    ...{ lastSelectedPosition: state.selectedPosition }
  };
};

const setIsEditing = (state, isEditing) => {
  return {...state, ...{isEditing}};
};

export const cellReducer$ = Observable.of(() => initialState)
  .merge(cellActions.setIsEditing.map((isEditing) => state => setIsEditing(state, isEditing)))
  .merge(cellActions.moveDown.map(() => state => moveCellBy(state, 0, 1)))
  .merge(cellActions.moveUp.map(() => state => moveCellBy(state, 0, -1)))
  .merge(cellActions.moveLeft.map(() => state => moveCellBy(state, -1, 0)))
  .merge(cellActions.moveRight.map(() => state => moveCellBy(state, 1, 0)))
  .merge(cellActions.selectCell.map(newSelected => state => selectCell(newSelected, state)));

