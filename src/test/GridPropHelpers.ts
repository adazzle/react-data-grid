import { ValueFormatter, SimpleCellFormatter } from '../formatters';
import { CalculatedColumn } from '../common/types';

export interface Row {
  id?: number;
  title?: string;
  count?: number;
  description?: string;
}

const columns: CalculatedColumn<Row>[] = [{
  idx: 0,
  key: 'id',
  name: 'ID',
  width: 100,
  left: 0,
  formatter: SimpleCellFormatter
}, {
  idx: 1,
  key: 'title',
  name: 'Title',
  width: 100,
  left: 100,
  formatter: ValueFormatter
}, {
  idx: 2,
  key: 'count',
  name: 'Count',
  width: 100,
  left: 200,
  formatter: ValueFormatter
}];

const _rows: Row[] = [];
for (let i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: `Title ${i}`,
    count: i * 1000
  });
}

export default {
  columns,
  rows: _rows,
  cellMetaData: {
    selected: { idx: 2, rowIdx: 3 },
    dragged: null,
    copied: null
  }
};
