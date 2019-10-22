import { valueCellContentRenderer, legacyCellContentRenderer } from '../Cell/cellContentRenderers';
import { CalculatedColumn, CellMetaData } from '../common/types';

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
  cellContentRenderer: legacyCellContentRenderer
}, {
  idx: 1,
  key: 'title',
  name: 'Title',
  width: 100,
  left: 100,
  cellContentRenderer: valueCellContentRenderer
}, {
  idx: 2,
  key: 'count',
  name: 'Count',
  width: 100,
  left: 200,
  cellContentRenderer: valueCellContentRenderer
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

export const fakeCellMetaData: CellMetaData<Row> = {
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
