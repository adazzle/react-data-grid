import Rx from 'rxjs';
import {cellReducer$} from './modules/Cell';

const reducer$ = Rx.Observable.merge(
  cellReducer$.map(reducer => ['cell', reducer]),
);

export default reducer$;
