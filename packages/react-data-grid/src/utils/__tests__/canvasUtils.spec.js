import { createColumns } from '../../__tests__/utils';
import { getColumnScrollPosition } from '../canvasUtils';

describe('canvasUtils', () => {
  describe('When canvas is scrolled left', () => {
    it('should calculate the scroll position for the selected column', () => {
      const columns = createColumns(10);
      const scrollPosition = getColumnScrollPosition(columns, 4, 500, 100);
      expect(scrollPosition).toBe(-100);
    });

    describe('When columns are frozen', () => {
      it('should calculate the scroll position for the selected column', () => {
        const columns = createColumns(10);
        columns[0].frozen = true;
        columns[1].frozen = true;
        const scrollPosition = getColumnScrollPosition(columns, 4, 500, 100);
        expect(scrollPosition).toBe(-300);
      });
    });
  });

  describe('When canvas is scrolled right', () => {
    it('should calculate the scroll position for the selected column', () => {
      const columns = createColumns(10);
      const scrollPosition = getColumnScrollPosition(columns, 7, 500, 100);
      expect(scrollPosition).toBe(200);
    });

    describe('When columns are frozen', () => {
      it('should calculate the scroll position for the selected column', () => {
        const columns = createColumns(10);
        columns[0].frozen = true;
        columns[1].frozen = true;
        const scrollPosition = getColumnScrollPosition(columns, 7, 500, 100);
        expect(scrollPosition).toBe(200);
      });
    });

    it('should not calculate the scroll position for the selected column when client width is greater than the scroll width', () => {
      const columns = createColumns(10);
      columns[0].frozen = true;
      columns[1].frozen = true;
      const scrollPosition = getColumnScrollPosition(columns, 7, 500, 400);
      expect(scrollPosition).toBeUndefined();
    });
  });
});
