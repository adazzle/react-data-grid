import Rx from 'rxjs';
import { createActions } from '../state/RxState';

export const cellActions = createActions(['moveUp', 'moveDown', 'moveRight', 'moveLeft']);

const initialState = {
  selected: {
    idx: 0,
    rowIdx: 0
  }
};

export const cellReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    cellActions.moveDown.map( () => (state) => {
      const selected = {...state.selected, ...{rowIdx: state.selected.rowIdx + 1}};
      return {...state, ...{selected} };
    })
  );
