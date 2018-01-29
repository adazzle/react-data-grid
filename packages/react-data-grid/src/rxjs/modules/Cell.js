import { Observable} from 'rxjs/Observable';
import { createActions } from '../state/RxState';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';

export const cellActions = createActions([
  'moveUp',
  'moveDown',
  'moveRight',
  'moveLeft'
]);

const initialState = {
  selected: {
    idx: 0,
    rowIdx: 0
  }
};

const isCellWithinBounds = ({idx, rowIdx}) => idx >= 0 && rowIdx >= 0;

const moveCellBy = (state, cellOffset, rowOffset) => {
  const {idx, rowIdx} = state.selected;
  const newCellCoords = { rowIdx: rowIdx + rowOffset, idx: idx + cellOffset };
  const selected = {
    ...state.selected,
    ...newCellCoords
  };
  return isCellWithinBounds(newCellCoords) ? { ...state, ...{ selected } } : state;
};

export const cellReducer$ = Observable.of(() => initialState)
  .merge(cellActions.moveDown.map(() => state => moveCellBy(state, 0, 1)))
  .merge(cellActions.moveUp.map(() => state => moveCellBy(state, 0, -1)))
  .merge(cellActions.moveLeft.map(() => state => moveCellBy(state, -1, 0)))
  .merge(cellActions.moveRight.map(() => state => moveCellBy(state, 1, 0)));
