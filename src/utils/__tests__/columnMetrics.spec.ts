import { getColumnMetrics } from '../columnUtils';
import { valueCellContentRenderer } from '../../Cell/cellContentRenderers';
import { Column } from '../../common/types';

interface Row {
  id?: number;
  title?: string;
  count?: string;
  frozenColumn1?: string;
  frozenColumn2?: string;
  frozenColumn3?: string;
}

describe('Column Metrics Tests', () => {
  describe('Creating metrics', () => {
    describe('When column width not set for all columns', () => {
      const viewportWidth = 300;
      const getInitialColumns = (): Column<Row>[] => [{
        key: 'id',
        name: 'ID',
        width: 60
      }, {
        key: 'title',
        name: 'Title'
      }, {
        key: 'count',
        name: 'Count'
      }];

      it('should set the unset column widths based on the total width', () => {
        const columns = getInitialColumns();
        const metrics = getColumnMetrics({
          columns,
          viewportWidth,
          minColumnWidth: 50,
          columnWidths: new Map(),
          defaultCellContentRenderer: valueCellContentRenderer
        });

        expect(metrics.columns[0].width).toEqual(60);
        expect(metrics.columns[1].width).toEqual(120);
        expect(metrics.columns[2].width).toEqual(120);
      });

      it('should set the column left based on the column widths', () => {
        const columns = getInitialColumns();
        const metrics = getColumnMetrics({
          columns,
          viewportWidth,
          minColumnWidth: 50,
          columnWidths: new Map(),
          defaultCellContentRenderer: valueCellContentRenderer
        });

        expect(metrics.columns[0].left).toEqual(0);
        expect(metrics.columns[1].left).toEqual(columns[0].width);
        expect(metrics.columns[2].left).toEqual(180);
      });

      it('should shift all frozen columns to the start of column metrics array', () => {
        const firstFrozenColumn: Column<Row> = { key: 'frozenColumn1', name: 'frozenColumn1', frozen: true };
        const secondFrozenColumn: Column<Row> = { key: 'frozenColumn2', name: 'frozenColumn2', frozen: true };
        const thirdFrozenColumn: Column<Row> = { key: 'frozenColumn3', name: 'frozenColumn3', frozen: true };
        const columns = [...getInitialColumns(), secondFrozenColumn, thirdFrozenColumn];
        columns.splice(2, 0, firstFrozenColumn);
        const metrics = getColumnMetrics({
          columns,
          viewportWidth,
          minColumnWidth: 50,
          columnWidths: new Map(),
          defaultCellContentRenderer: valueCellContentRenderer
        });
        expect(metrics.columns[0]).toMatchObject(firstFrozenColumn);
        expect(metrics.columns[1]).toMatchObject(secondFrozenColumn);
        expect(metrics.columns[2]).toMatchObject(thirdFrozenColumn);
      });
    });
  });
});
