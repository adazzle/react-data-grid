import TestUtils from 'react-dom/test-utils';
import GridRunner from './GridRunner';
import ReactDOM from 'react-dom';

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

  describe('Copy and paste', () => {
    it('copies a cell', () => {
      gridRunner
        .selectCell({cellIdx: 3, rowIdx: 3})
        .copy()
        .hasCopied({cellIdx: 3, rowIdx: 3});
    });

    it('copying a second cell removes the copying style from first cell', () => {
      let firstCellIdx = 3;
      gridRunner.selectCell({cellIdx: firstCellIdx, rowIdx: 1}).copy();

      let firstCell = gridRunner.getCell({cellIdx: firstCellIdx, rowIdx: 1});
      expect(ReactDOM.findDOMNode(firstCell.node).className.indexOf('copied') > -1).toBe(true);

      gridRunner.selectCell({cellIdx: 4, rowIdx: 1})
      .copy();
      expect(ReactDOM.findDOMNode(firstCell.node).className.indexOf('copied') > -1).toBe(false);
    });
  });

  describe('Drag', () => {
    it('Shows drag selector', () => {
      gridRunner.drag({
        from: 0,
        to: 4,
        col: 4,
        beforeEnd: () => {
          // check we have the right classes
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'is-dragged-over-down').length).toEqual(1);
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'was-dragged-over').length).toEqual(2);
        }
      });
    });

    it('Drags a column down', () => {
      gridRunner.drag({from: 0, to: 4, col: 4})
        .hasDragged({from: 0, to: 4, col: 4, cellKey: 'title'});
    });

    it('Drags a column up', () => {
      // React-data-grid treats a drag up as a drag down, so need to assert using the
      // drag down equivalent of our drag event.
      gridRunner.drag({from: 4, to: 0, col: 5})
        .hasDragged({ from: 0, to: 4, col: 5, cellKey: 'firstName' });
    });
  });

  describe('Selection', () => {
    it('Selects on click', () => {
      gridRunner.selectCell({cellIdx: 3, rowIdx: 3})
        .hasSelected({cellIdx: 3, rowIdx: 3})
        .dispose();
    });
  });

  describe('Editors', () => {
    it('Readonly columns are NOT Editable', () => {
      gridRunner.clickIntoEditor({cellIdx: 0, rowIdx: 3})
        .isNotEditable();
    });

    it('Enter commits an edit', () => {
      gridRunner.changeCell({
        select: {row: 3, cell: 5},
        val: 'Test',
        ev: {key: 'Enter'},
        expectToSelect: {row: 3, cell: 5}
      });
    });

    it('Start editing by pressing a key', () => {
      const letterEKeyCode = 69;
      gridRunner.selectCell({rowIdx: 3, cellIdx: 5})
        .keyDown({
          keyCode: letterEKeyCode
        }, gridRunner.cell )
        .isEditable()
        .keyDown({key: 'Enter'})
        .hasCommitted('E') // keydown ALWAYS upper case http://stackoverflow.com/questions/2263889/why-always-uppercase-in-my-code
        .isNotEditable()
        .dispose();
    });

    it('Start editing by pressing enter', () => {
      gridRunner.selectCell({rowIdx: 3, cellIdx: 5})
        .keyDown({key: 'Enter'}, gridRunner.cell)
        .isEditable()
        .dispose();
    });

    it('Can tab out of an Editor', () => {
      gridRunner.changeCell({
        select: {row: 3, cell: 5},
        val: 'Test',
        ev: {key: 'Tab'},
        expectToSelect: {row: 3, cell: 6}
      });
    });

    it('Can shift+tab out of an Editor', () => {
      gridRunner.changeCell({
        select: {row: 3, cell: 5},
        val: 'Test',
        ev: {key: 'Tab', shiftKey: true},
        expectToSelect: {row: 3, cell: 4}
      });
    });

    it('should commit editor changes on blur', () => {
      gridRunner = new GridRunner({});
      gridRunner.clickIntoEditor({ rowIdx: 3, cellIdx: 5})
        .setValue('Test')
        .selectCell({ rowIdx: 4, cellIdx: 3 })
        .selectCell({ rowIdx: 3, cellIdx: 5 })
        .hasCommitted('Test')
        .dispose();
    });

    it('Arrow Left doesnt commit your change if you are not at the start of the text', () => {
      gridRunner = new GridRunner({renderIntoBody: true});
      gridRunner.clickIntoEditor({rowIdx: 3, cellIdx: 4})
        .setValue('Test')
        .setCursor(2)
        .keyDown({key: 'ArrowLeft'})
        .isEditable()
        // Need to escape the editor here since dispose will prompt componentWillUnmount,
        // committing the text and causing a re-render as the grid unmounts.
        .keyDown({ key: 'Escape' })
        .dispose();
    });

    it('Arrow Left does commit your change if you are at the start of the text', () => {
      // by default we are at pos 0 with a blank value
      gridRunner.changeCell({
        select: {row: 3, cell: 4},
        val: '',
        ev: {key: 'ArrowLeft'},
        expectToSelect: {row: 3, cell: 3}
      });
    });

    it('Arrow Right commits your change when you are at the end of the text', () => {
      gridRunner = new GridRunner({renderIntoBody: true});
      gridRunner.clickIntoEditor({rowIdx: 3, cellIdx: 4})
        .setValue('Test')
        .setCursor(4)
        .keyDown({key: 'ArrowRight'})
        .hasCommitted('Test')
        .hasSelected({rowIdx: 3, cellIdx: 5})
        .dispose();
    });

    it('Arrow Right doesnt commit your change when you are not at the end of the text', () => {
      gridRunner = new GridRunner({renderIntoBody: true});
      gridRunner.clickIntoEditor({rowIdx: 3, cellIdx: 4})
        .setValue('Test')
        .setCursor(2)
        .keyDown({key: 'ArrowRight'})
        .isEditable()
        // Need to escape the editor here since dispose will prompt componentWillUnmount,
        // committing the text and causing a re-render as the grid unmounts.
        .keyDown({ key: 'Escape' })
        .dispose();
    });

    it('Arrow Up commits your change', () => {
      gridRunner.changeCell({
        select: {row: 3, cell: 4},
        val: 'Test',
        ev: {key: 'ArrowUp'},
        expectToSelect: {row: 2, cell: 4}
      });
    });

    it('Arrow Down commits your change', () => {
      gridRunner.changeCell({
        select: {row: 3, cell: 4},
        val: 'Test',
        ev: {key: 'ArrowDown'},
        expectToSelect: {row: 4, cell: 4}
      });
    });
  });
});
