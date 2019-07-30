import { CalculatedColumn } from '../../common/types';

export interface RowType {
  id: number;
  title: string;
  count: number;
}

const columns: CalculatedColumn<RowType>[] = [{
  idx: 0,
  key: 'id',
  name: 'ID',
  width: 100,
  left: 0
}, {
  idx: 1,
  key: 'title',
  name: 'Title',
  width: 100,
  left: 100
}, {
  idx: 2,
  key: 'count',
  name: 'Count',
  width: 100,
  left: 200
}];

const _rows: RowType[] = [];
for (let i = 0; i < 1000; i++) {
  _rows.push({
    id: i,
    title: `Title ${i}`,
    count: i * 1000
  });
}

export default {
  columns,
  rowGetter(i: number) {
    return _rows[i];
  },
  rowsCount() {
    return _rows.length;
  },
  cellMetaData: {
    selected: { idx: 2, rowIdx: 3 },
    dragged: null,
    copied: null
  }
};

export const fakeCellMetaData = {
  rowKey: 'id',
  onCellClick: () => null,
  onCellMouseDown: () => null,
  onCellExpand: () => null,
  onCellMouseEnter: () => null,
  onCellContextMenu: () => null,
  onRowExpandToggle: () => null,
  onCellDoubleClick: () => null,
  onDragEnter: () => null
};
