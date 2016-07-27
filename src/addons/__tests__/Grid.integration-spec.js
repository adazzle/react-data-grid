import TestUtils from 'react/lib/ReactTestUtils';
import GridRunner from './GridRunner';
import ReactDOM from 'react-dom';

describe('Grid Integration', () => {
  describe('Setup', () => {
    it('Creates the grid', () => {
      expect(new GridRunner({}).grid).toBeDefined();
    });

    it('Renders the grid', () => {
      TestUtils.isDOMComponent(new GridRunner({}).grid);
    });

    it('Renders 22 rows by default', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(new GridRunner({}).grid, 'react-grid-Row').length).toEqual(22);
    });

    // the results of this test are so letiable that it keeps failing the build. ignoring for now
    xit('Renders the grid in under 1500ms', () => {
      // this is obviously a bit of an arbitary number
      // not strictly a test, as (duh) it depends on what machine and js engine (aka browser) you use
      // but it works as a useful stop gap for anything that really kills perf.
      // as we make any perf improvements, we shoudl update this number to get it as low as we can
      // but dont think of this test as an form of performance benchmark, if this was a GCSE, I'd (hopefully) fail!
      let start = new Date();
      let grid = new GridRunner({renderIntoBody: true});
      TestUtils.isDOMComponent(grid.grid);
      expect(new Date() - start).not.toBeGreaterThan(1500);
      grid.dispose();
    });
  });

  describe('Copy and paste', () => {
    it('copies a cell', () => {
      new GridRunner({})
      .selectCell({cellIdx: 3, rowIdx: 3})
      .copy()
      .hasCopied({cellIdx: 3, rowIdx: 3});
    });

    it('copying a second cell removes the copying style from first cell', () => {
      let firstCellIdx = 3;
      let gridRunner = new GridRunner({})
      .selectCell({cellIdx: firstCellIdx, rowIdx: 1})
      .copy();
      let firstCell = gridRunner.getCells(gridRunner.row)[firstCellIdx];
      expect(ReactDOM.findDOMNode(firstCell).className.indexOf(' copied') > -1).toBe(true);

      gridRunner.selectCell({cellIdx: 4, rowIdx: 1})
      .copy();
      expect(ReactDOM.findDOMNode(firstCell).className.indexOf(' copied') > -1).toBe(false);
    });
  });

  describe('Navigation', () => {
    it('header columns and cells stay in line', () => {
      let gridRunner = new GridRunner({renderIntoBody: true})
      .selectCell({cellIdx: 14, rowIdx: 0});
      let firstRowCells = TestUtils.scryRenderedDOMComponentsWithClass(gridRunner.grid, 'react-grid-Cell');
      let headerCells = TestUtils.scryRenderedDOMComponentsWithClass(gridRunner.grid, 'react-grid-HeaderCell');
      headerCells.forEach((hCell, i) => {
        expect(hCell.props.style.left).toEqual(firstRowCells[i].props.style.left);
      });
    });
  });

  describe('Drag', () => {
    it('Shows drag selector', () => {
      new GridRunner({})
      .drag({from: 0, to: 4, col: 4,
      beforeEnd: function() {
        // check we have the right classes
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'is-dragged-over-down').length).toEqual(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'was-dragged-over').length).toEqual(2);
      }});
    });

    it('Drags a column down', () => {
      new GridRunner({})
      .drag({from: 0, to: 4, col: 4})
      .hasDragged({from: 0, to: 4, col: 4, cellKey: 'title'});
    });

    it('Drags a column up', () => {
      new GridRunner({})
      .drag({from: 4, to: 0, col: 5})
      // React-data-grid treats a drag up as a drag down, so need to assert using the
      // drag down equivalent of our drag event.
      .hasDragged({ from: 0, to: 4, col: 5, cellKey: 'firstName' });
    });
  });
  // @jpdriver - commented out for now because this was a pain to write an integration test for
  // we should rewrite the drag events not to attach to the window
  //
  // describe('Column Resize', () => {
  //   it("Resizes a column on drag", () => {
  //     let args = {idx:3,toWidth:200};
  //     new GridRunner({})
  //     .resize(args)
  //     .hasBeenResized(args);
  //   });
  // });
  describe('Selection', () => {
    it('Selects on click', () => {
      new GridRunner({})
      .selectCell({cellIdx: 3, rowIdx: 3})
      .hasSelected({cellIdx: 3, rowIdx: 3})
      .dispose();
    });
  });

  describe('Editors', () => {
    it('Readonly columns are NOT Editable', () => {
      new GridRunner({})
      .clickIntoEditor({cellIdx: 1, rowIdx: 3})
      .isNotEditable();
    });

    it('Enter commits an edit', () => {
      new GridRunner({})
        .changeCell({
          select: {row: 3, cell: 5},
          val: 'Test',
          ev: {key: 'Enter'},
          expectToSelect: {row: 3, cell: 5}
        });
    });

    it('Start editing by pressing a key', () => {
      let grid = new GridRunner({});
      const letterEKeyCode = 69;
      grid.selectCell({rowIdx: 3, cellIdx: 5})
        .keyDown({
          keyCode: letterEKeyCode
        }, grid.cell )
        .isEditable()
        .keyDown({key: 'Enter'})
        .hasCommitted('E') // keydown ALWAYS upper case http://stackoverflow.com/questions/2263889/why-always-uppercase-in-my-code
        .isNotEditable()
        .dispose();
    });

    it('Start editing by pressing enter', () => {
      let grid = new GridRunner({});
      grid.selectCell({rowIdx: 3, cellIdx: 5})
        .keyDown({key: 'Enter'}, grid.cell)
        .isEditable()
        .dispose();
    });

    it('Can tab out of an Editor', () => {
      new GridRunner({})
      .changeCell({
        select: {row: 3, cell: 5},
        val: 'Test',
        ev: {key: 'Tab'},
        expectToSelect: {row: 3, cell: 6}
      });
    });

    it('Can shift+tab out of an Editor', () => {
      new GridRunner({})
      .changeCell({
        select: {row: 3, cell: 5},
        val: 'Test',
        ev: {key: 'Tab', shiftKey: true},
        expectToSelect: {row: 3, cell: 4}
      });
    });

    it('should commit editor changes on blur', () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({ rowIdx: 3, cellIdx: 5})
        .setValue('Test')
        .selectCell({ rowIdx: 4, cellIdx: 3 })
        .selectCell({ rowIdx: 3, cellIdx: 5 })
        .hasCommitted('Test')
        .dispose();
    });

    it('Arrow Left doesnt commit your change if you are not at the start of the text', () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx: 3, cellIdx: 5})
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
      new GridRunner({})
      // by default we are at pos 0 with a blank value
      .changeCell({
        select: {row: 3, cell: 5},
        val: '',
        ev: {key: 'ArrowLeft'},
        expectToSelect: {row: 3, cell: 4}
      });
    });

    it('Arrow Right commits your change when you are at the end of the text', () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx: 3, cellIdx: 5})
        .setValue('Test')
        .setCursor(4)
        .keyDown({key: 'ArrowRight'})
        .hasCommitted('Test')
        .hasSelected({rowIdx: 3, cellIdx: 6})
        .dispose();
    });

    it('Arrow Right doesnt commit your change when you are not at the end of the text', () => {
      new GridRunner({renderIntoBody: true})
        .clickIntoEditor({rowIdx: 3, cellIdx: 5})
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
      new GridRunner({})
        .changeCell({
          select: {row: 3, cell: 5},
          val: 'Test',
          ev: {key: 'ArrowUp'},
          expectToSelect: {row: 2, cell: 5}
        });
    });

    it('Arrow Down commits your change', () => {
      new GridRunner({})
        .changeCell({
          select: {row: 3, cell: 5},
          val: 'Test',
          ev: {key: 'ArrowDown'},
          expectToSelect: {row: 4, cell: 5}
        });
    });
  });

  describe('Context Menu', () => {
    let grid = {};
    let fakeRowIdx = 3;
    let fakeIdx = 5;

    beforeEach(() => {
      grid = new GridRunner({});
    });

    afterEach(() => {
      grid.dispose();
    });

    it('should show context menu on right click', () => {
      grid.rightClickCell({cellIdx: fakeIdx, rowIdx: fakeRowIdx});
      expect(grid.isContextMenuVisible()).toEqual(true);
    });

    it('should hide context menu on selecting menu item', () => {
      grid.clickContextMenuLink();
      expect(grid.isContextMenuVisible()).toEqual(false);
    });

    // Please note: this test will fail if the MenuItem's inner text in example14-all-features-immutable is changed.
    it('should get row and column indexes from context menu', () => {
      grid.rightClickCell({cellIdx: fakeIdx, rowIdx: fakeRowIdx});
      let menuItem = grid.getContextMenuItem();
      // Using this alternative for firefox tests
      let menuItemValue = menuItem.innerText !== undefined ? menuItem.innerText : menuItem.textContent;
      let idxs = menuItemValue.split(',');
      expect(fakeRowIdx).toEqual(parseInt(idxs[0], 10));
      expect(fakeIdx).toEqual(parseInt(idxs[1], 10));
    });

    // In ContextMenuWrapper's componentWillReceiveProps the function getMenuPosition is called with a delay
    // (window.requestAnimationFrame || setTimeout). This causes timing issues when you have both 'right click on cell' (open menu)
    // and 'click on menu item' (close menu) in the same test. To avoid this we need to close the menu after each right click
    // in a separate test.
    it('should hide context menu', () => {
      grid.clickContextMenuLink();
      expect(grid.isContextMenuVisible()).toEqual(false);
    });
  });
});
