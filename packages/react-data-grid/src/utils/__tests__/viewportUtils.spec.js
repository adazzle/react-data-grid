import columnUtils from '../../ColumnUtils';
import { getGridState } from '../viewportUtils';

describe('viewportUtils', () => {
  describe('getGridState', () => {
    const getState = (propsOverrides = {}) => {
      const props = Object.assign({
        columnMetrics: {
          columns: [
            { key: 'col1' },
            { key: 'col2' }
          ]
        },
        minHeight: 100,
        rowOffsetHeight: 5,
        rowHeight: 20,
        rowsCount: 100
      }, propsOverrides);
      const state = getGridState(props);

      return { props, state };
    };

    it('should correctly set canvas height', () => {
      const { state } = getState();
      expect(state.height).toBe(95);
    });

    it('should correctly set the displayed rows count when rowsCount is greater than the rendered rows count', () => {
      const { state } = getState();
      expect(state.displayEnd).toBe(16);
    });

    it('should correctly set the displayed rows count when rowsCount is less than the rendered rows count', () => {
      const { state } = getState({ rowsCount: 10 });
      expect(state.displayEnd).toBe(10);
    });

    it('should correctly set the column count', () => {
      const fakeGetSize = spyOn(columnUtils, 'getSize').and.returnValue(15);
      const { state, props } = getState();

      expect(fakeGetSize).toHaveBeenCalledWith(props.columnMetrics.columns);
      expect(state.colVisibleEnd).toBe(15);
    });
  });
});
