import TestUtils from 'react-dom/test-utils';
import GridRunner from './GridRunner';

describe('Grid Integration', () => {
  let gridRunner;
  let grid;

  beforeEach(() => {
    gridRunner = new GridRunner({});
    grid = gridRunner.grid;
  });

  afterEach(() => {
    gridRunner.dispose();
    gridRunner = null;
    grid = null;
  });

  describe('Setup', () => {
    it('Creates the grid', () => {
      expect(grid).toBeDefined();
    });

    it('Renders the grid', () => {
      TestUtils.isDOMComponent(grid);
    });

    it('Renders the expected number of rows', () => {
      const { displayStart, displayEnd } = gridRunner.getDisplayInfo();
      let expectedNumberOfRows = displayEnd - displayStart;

      expect(gridRunner.getRenderedRows().length).toEqual(expectedNumberOfRows);
    });
  });
});
