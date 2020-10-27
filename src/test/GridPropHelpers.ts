import { ValueFormatter, SimpleCellFormatter } from '../formatters';
import { CalculatedColumn } from '../types';

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
  resizable: false,
  sortable: false,
  formatter: SimpleCellFormatter
}, {
  idx: 1,
  key: 'title',
  name: 'Title',
  width: 100,
  left: 100,
  resizable: false,
  sortable: false,
  formatter: ValueFormatter
}, {
  idx: 2,
  key: 'count',
  name: 'Count',
  width: 100,
  left: 200,
  resizable: false,
  sortable: false,
  formatter: ValueFormatter
}];

const rows: Row[] = [];
for (let i = 0; i < 1000; i++) {
  rows.push({
    id: i,
    title: `Title ${i}`,
    count: i * 1000
  });
}

export default {
  columns,
  rows,
  cellMetaData: {
    selected: { idx: 2, rowIdx: 3 },
    dragged: null,
    copied: null
  }
};
