const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('react-data-grid');
const { editors: { CheckboxEditor } } = Grid;
const TestUtils = require('react-dom/test-utils');
const StubComponent = require('../../../../test/StubComponent');
const mockStateObject = require('./data/MockStateObject');
const { mount } = require('enzyme');

describe('Grid', function() {
  beforeEach(function() {
    this.columns = [
      { key: 'id', name: 'ID', width: 100, events: { onClick: () => {}} },
      { key: 'title', name: 'Title', width: 100 },
      { key: 'count', name: 'Count', width: 100 },
      { key: 'country', name: 'Country', width: 100, events: { onClick: () => {}, onDoubleClick: () => {}, onDragOver: () => {}}}
    ];

    this._rows = [];
    this._selectedRows = [];
    this.rowGetter = (i) => this._rows[i];

    for (let i = 0; i < 1000; i++) {
      this._rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        isOdd: !!(i % 2)
      });
    }

    this.noop = function() {};
    this.testProps = {
      enableCellSelect: true,
      columns: this.columns,
      rowGetter: this.rowGetter,
      rowsCount: this._rows.length,
      width: 300,
      onRowUpdated: this.noop,
      onCellCopyPaste: this.noop,
      onCellsDragged: this.noop,
      onGridSort: this.noop,
      onAddFilter: () => {},
      rowKey: 'id'
    };

    this.buildFakeEvent = (addedData) => {
      return Object.assign({}, {
        preventDefault: this.noop,
        stopPropagation: this.noop
      }, addedData);
    };

    this.buildFakeCellUodate = (addedData) => {
      return Object.assign({}, {
        cellKey: 'title',
        rowIdx: 0,
        updated: { title: 'some new title' },
        key: 'Enter'
      }, addedData);
    };

    this.getBaseGrid = () => this.component.base;

    this.getCellMetaData = () => this.getBaseGrid().props.cellMetaData;

    this.simulateGridKeyDown = (key, ctrlKey) => {
      let fakeEvent = this.buildFakeEvent({
        key: key,
        keyCode: key,
        ctrlKey: ctrlKey
      });
      this.getBaseGrid().props.onViewportKeydown(fakeEvent);
    };

    this.simulateGridKeyDownWithKeyCode = (keyCode) => {
      let fakeEvent = this.buildFakeEvent({
        keyCode: keyCode
      });
      this.getBaseGrid().props.onViewportKeydown(fakeEvent);
    };

    let buildProps = (addedProps) => Object.assign({}, this.testProps, addedProps);
    this.createComponent = (addedProps) => {
      return mount(<Grid {...buildProps(addedProps)}/>);
    };

    this.componentWrapper = this.createComponent();
    this.component = this.componentWrapper.node;
  });

  it('should create a new instance of Grid', function() {
    expect(this.component).toBeDefined();
  });

  it('should render a BaseGrid stub', function() {
    expect(this.getBaseGrid()).toBeDefined();
  });

  it('should be initialized with correct state', function() {
    let events = [this.columns[0].events, this.columns[1].events, this.columns[2].events, this.columns[3].events];
    expect(this.component.state).toEqual(mockStateObject({
      selectedRows: this._selectedRows
    }, events));
  });

  // Set of tests for the props that defined the height of our rows
  describe('when defininig heigths on props', function() {
    describe('for defaults props', function() {
      beforeEach(function() {
        const ToolBarStub = new StubComponent('Toolbar');
        this.component = this.createComponent({ toolbar: <ToolBarStub /> }).node;
        this.toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, ToolBarStub);
        this.toolbarInstance.props.onToggleFilter();
        this.baseGrid = this.getBaseGrid();
      });

      it('uses the appropriate default for the grid row height', function() {
        expect(this.baseGrid.props.rowHeight).toEqual(35);
      });

      it('uses the appropriate default for the header row height', function() {
        expect(this.baseGrid.props.headerRows[0].height).toEqual(35);
      });

      it('uses the appropriate default for the header filter row height', function() {
        expect(this.baseGrid.props.headerRows[1].height).toEqual(45);
      });
    });

    describe('for a given row height prop', function() {
      beforeEach(function() {
        const ToolBarStub = new StubComponent('Toolbar');
        this.component = this.createComponent({ toolbar: <ToolBarStub />, rowHeight: 40 }).node;
        this.toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, ToolBarStub);
        this.toolbarInstance.props.onToggleFilter();
        this.baseGrid = this.getBaseGrid();
      });

      it('passes the correct heigth to the grid rows', function() {
        expect(this.baseGrid.props.rowHeight).toEqual(40);
      });

      it('passes the grid row heigth to the header row when no height to the specific header row is provided', function() {
        expect(this.baseGrid.props.headerRows[0].height).toEqual(40);
      });

      it('uses the default prop height for the filter row when none is provided', function() {
        expect(this.baseGrid.props.headerRows[1].height).toEqual(45);
      });
    });

    describe('for given row and header height props', function() {
      beforeEach(function() {
        const ToolBarStub = new StubComponent('Toolbar');
        this.component = this.createComponent({ toolbar: <ToolBarStub />, rowHeight: 40, headerRowHeight: 50, headerFiltersHeight: 60 }).node;
        this.toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, ToolBarStub);
        this.toolbarInstance.props.onToggleFilter();
        this.baseGrid = this.getBaseGrid();
      });

      it('passes the correct heigth to the grid rows', function() {
        expect(this.baseGrid.props.rowHeight).toEqual(40);
      });

      it('passes the correct heigth to the header row', function() {
        expect(this.baseGrid.props.headerRows[0].height).toEqual(50);
      });

      it('passes the correct heigth to the header filter row', function() {
        expect(this.baseGrid.props.headerRows[1].height).toEqual(60);
      });
    });
  });

  describe('if passed in as props to grid', function() {
    beforeEach(function() {
      const ToolBarStub = new StubComponent('Toolbar');
      this.component = this.createComponent({ toolbar: <ToolBarStub /> }).node;
      this.toolbarInstance = TestUtils.findRenderedComponentWithType(this.component, ToolBarStub);
    });

    it('should render a Toolbar', function() {
      expect(this.toolbarInstance).toBeDefined();
    });

    describe('onToggleFilter trigger of Toolbar', function() {
      beforeEach(function() {
        this.toolbarInstance.props.onToggleFilter();
        this.baseGrid = this.getBaseGrid();
      });

      it('should set filter state of grid and render a filterable header row', function() {
        let filterableHeaderRow = this.baseGrid.props.headerRows[1];
        expect(this.component.state.canFilter).toBe(true);
        expect(this.baseGrid.props.headerRows.length).toEqual(2);
        expect(typeof filterableHeaderRow.ref).toEqual('function');
      });
    });
  });

  describe('When cell selection disabled', function() {
    beforeEach(function() {
      this.component = this.createComponent({
        enableCellSelect: false,
        columns: this.columns,
        rowGetter: this.rowGetter,
        rowsCount: this._rows.length,
        width: 300
      }).node;
    });

    it('grid should be initialized with selected state of {rowIdx : -1, idx : -1}', function() {
      expect(this.component.state.selected).toEqual({ rowIdx: -1, idx: -1 });
    });
  });

  describe('When row selection enabled', function() {
    beforeEach(function() {
      this.component = this.createComponent({ enableRowSelect: true}).node;
      this.baseGrid = this.getBaseGrid();
      this.selectRowCol = this.baseGrid.props.columnMetrics.columns[0];
    });

    it('should render an additional Select Row column', function() {
      expect(this.baseGrid.props.columnMetrics.columns.length).toEqual(this.columns.length + 1);
      expect(this.selectRowCol.key).toEqual('select-row');
      expect(TestUtils.isElementOfType(this.selectRowCol.formatter, CheckboxEditor)).toBe(true);
    });

    describe('checking header checkbox', function() {
      beforeEach(function() {
        let checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        this.checkbox = checkboxWrapper.querySelector('input');
        const SelectAll = this.selectRowCol.headerRenderer;
        this.selectAllWrapper = mount(SelectAll);
        this.fakeEvent = this.buildFakeEvent({ currentTarget: this.checkbox });
        this.selectAllWrapper.props().onChange(this.fakeEvent);
      });

      it('should select all rows', function() {
        let selectedRows = this.component.state.selectedRows;
        expect(selectedRows.length).toEqual(this._rows.length);

        expect(selectedRows.length).toBeGreaterThan(1);
        selectedRows.forEach((selected) => expect(selected.isSelected).toBe(true));
      });

      describe('and then unchecking header checkbox', function() {
        beforeEach(function() {
          this.checkbox.checked = false;
          this.selectAllWrapper.props().onChange(this.fakeEvent);
        });

        it('should deselect all rows', function() {
          let selectedRows = this.component.state.selectedRows;

          expect(selectedRows.length).toBeGreaterThan(1);
          selectedRows.forEach((selected) => expect(selected.isSelected).toBe(false));
        });
      });
    });

    describe('when selected is false', function() {
      beforeEach(function() {
        this.component.setState({selectedRows: [{id: 0, isSelected: false}, {id: 1, isSelected: false}, {id: 2, isSelected: false}, {id: 3, isSelected: false}]});
        let selectRowCol = this.baseGrid.props.columnMetrics.columns[0];
        selectRowCol.onCellChange(3, 'select-row',  this._rows[3], this.buildFakeEvent());
      });

      it('should be able to select an individual row', function() {
        expect(this.component.state.selectedRows[3].isSelected).toBe(true);
      });
    });

    describe('when selected is null', function() {
      beforeEach(function() {
        this.component.setState({selectedRows: [{id: 0, isSelected: null}, {id: 1, isSelected: null}, {id: 2, isSelected: null}, {id: 3, isSelected: null}]});
        let selectRowCol = this.baseGrid.props.columnMetrics.columns[0];
        selectRowCol.onCellChange(2, 'select-row', this._rows[2], this.buildFakeEvent());
      });

      it('should be able to select an individual row', function() {
        expect(this.component.state.selectedRows[2].isSelected).toBe(true);
      });
    });

    describe('when selected is true', function() {
      beforeEach(function() {
        this.component.setState({selectedRows: [{id: 0, isSelected: null}, {id: 1, isSelected: true}, {id: 2, isSelected: true}, {id: 3, isSelected: true}]});
        let selectRowCol = this.baseGrid.props.columnMetrics.columns[0];
        selectRowCol.onCellChange(3, 'select-row', this._rows[3], this.buildFakeEvent());
      });

      it('should be able to unselect an individual row ', function() {
        expect(this.component.state.selectedRows[3].isSelected).toBe(false);
      });
    });
  });

  describe('Cell Navigation', function() {
    describe('when cell navigation is configured to default, none', function() {
      beforeEach(function() {
        this.component = this.createComponent({enableCellSelect: true}).node;
      });

      describe('when on last cell in a row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 3, rowIdx: 1 } });
        });
        it('selection should stay on cell', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 1 });
        });
      });
      describe('when on first cell in row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 0, rowIdx: 1 } });
        });
        it('nothing should happen', function() {
          this.simulateGridKeyDown('ArrowLeft');
          expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 1 });
        });
      });
      describe('when row selection is enabled and positioned on cell before last in row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 2, rowIdx: 1 }, enableRowSelect: true });
        });
        it('selection should move to last cell', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 1 });
        });
      });
    });

    describe('when cell navigation is configured to change rows', function() {
      beforeEach(function() {
        this.component = this.createComponent({cellNavigationMode: 'changeRow', enableCellSelect: true}).node;
      });

      describe('when on last cell in a row that\'s not the last', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 3, rowIdx: 1 } });
        });
        it('selection should move to first cell in next row', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 2 });
        });
      });
      describe('when on last cell in last row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 3, rowIdx: 999 } });
        });
        it('nothing should happen', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 999 });
        });
      });
      describe('when on first cell in a row that\'s not the first', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 0, rowIdx: 2 } });
        });
        it('selection should move to last cell in previous row', function() {
          this.simulateGridKeyDown('ArrowLeft');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 1 });
        });
      });
      describe('when on first cell in the first row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 0, rowIdx: 0 } });
        });
        it('nothing should happen', function() {
          this.simulateGridKeyDown('ArrowLeft');
          expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 0 });
        });
      });
      describe('when row selection is enabled and positioned on cell before last in row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 2, rowIdx: 1 }, enableRowSelect: true });
        });
        it('selection should move to last cell', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 1 });
        });
      });
    });

    describe('when cell navigation is configured to loop over cells in row', function() {
      beforeEach(function() {
        this.component = this.createComponent({cellNavigationMode: 'loopOverRow', enableCellSelect: true}).node;
      });

      describe('when on last cell, looping enabled', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 3, rowIdx: 1 } });
        });
        it('selection should move to first cell in same row', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 1 });
        });
      });
      describe('when on last cell in last row with looping enabled', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 3, rowIdx: 999 } });
        });
        it('selection should move to first cell in same row', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 999 });
        });
      });
      describe('when on first cell with looping enabled', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 0, rowIdx: 2 } });
        });
        it('selection should move to last cell in same row', function() {
          this.simulateGridKeyDown('ArrowLeft');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 2 });
        });
      });
      describe('when on first cell in first row with looping enabled', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 0, rowIdx: 0 } });
        });
        it('selection should move to last cell in same row', function() {
          this.simulateGridKeyDown('ArrowLeft');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 0 });
        });
      });

      describe('when row selection enabled and positioned on cell before last in row', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 2, rowIdx: 1 }, enableRowSelect: true });
        });
        it('selection should move to last cell', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.state.selected).toEqual({ idx: 3, rowIdx: 1 });
        });
      });
    });
  });
  describe('Cell Selection/DeSelection handlers', function() {
    describe('when cell selection/deselection handlers are passed', function() {
      beforeEach(function() {
        const extraProps = { onCellSelected: this.noop, onCellDeSelected: this.noop };
        spyOn(extraProps, 'onCellSelected');
        spyOn(extraProps, 'onCellDeSelected');
        this.component = this.createComponent(extraProps).node;
      });

      describe('cell is selected', function() {
        beforeEach(function() {
          this.component.setState({ selected: { rowIdx: 1, idx: 2 } });
        });
        it('deselection handler should have been called', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.props.onCellDeSelected).toHaveBeenCalled();
          expect(this.component.props.onCellDeSelected.calls.mostRecent().args[0]).toEqual({
            rowIdx: 1,
            idx: 2
          });
        });
        it('selection handler should have been called', function() {
          this.simulateGridKeyDown('ArrowRight');
          expect(this.component.props.onCellSelected).toHaveBeenCalled();
          expect(this.component.props.onCellSelected.calls.mostRecent().args[0]).toEqual({
            rowIdx: 1,
            idx: 3
          });
        });
      });
    });
  });

  describe('When selection enabled and using rowSelection props', function() {
    beforeEach(function() {
      let self = this;
      this._selectedRows = [];
      this._deselectedRows = [];
      this.rows = [{id: '1', isSelected: true}, {id: '2', isSelected: false}, {id: '3', isSelected: false}, {id: '4', isSelected: false}];
      let columns = [{name: 'Id', key: 'id'}];
      let rowGetter = function(i) {
        return self.rows[i];
      };
      this.component = this.createComponent({ rowsCount: this.rows.length, rowGetter: rowGetter, columns: columns, rowSelection: {enableShiftSelect: true, selectBy: {isSelectedKey: 'isSelected'},
        onRowsSelected: function(selectedRows) {
          self._selectedRows = selectedRows;
        },
        onRowsDeselected: function(deselectedRows) {
          self._deselectedRows = deselectedRows;
        }
      }}).node;
      this.baseGrid = this.getBaseGrid();
      this.selectRowCol = this.baseGrid.props.columnMetrics.columns[0];
    });

    it('should call rowSelection.onRowsSelected when row selected', function() {
      this.selectRowCol.onCellChange(1, '',  this.rows[1], this.buildFakeEvent());
      expect(this._selectedRows.length).toBe(1);
      expect(this._selectedRows[0].rowIdx).toBe(1);
      expect(this._selectedRows[0].row).toBe(this.rows[1]);
    });

    it('should call rowSelection.onRowsDeselected when row de-selected', function() {
      this.selectRowCol.onCellChange(0, '',  this.rows[0], this.buildFakeEvent());
      expect(this._deselectedRows.length).toBe(1);
      expect(this._deselectedRows[0].rowIdx).toBe(0);
      expect(this._deselectedRows[0].row).toBe(this.rows[0]);
    });


    it('should set lastRowIdxUiSelected state', function() {
      this.selectRowCol.onCellChange(1, '',  this.rows[1], this.buildFakeEvent());
      expect(this.component.state.lastRowIdxUiSelected).toEqual(1);
    });


    it('should select range when shift selecting below selected row', function() {
      this.selectRowCol.onCellChange(1, '',  this.rows[1], this.buildFakeEvent());
      expect(this._selectedRows.length).toEqual(1);
      this.simulateGridKeyDownWithKeyCode(16);
      this.selectRowCol.onCellChange(3, '',  this.rows[3], this.buildFakeEvent());
      expect(this._selectedRows.length).toEqual(2);
    });


    it('should select range when shift selecting above selected row', function() {
      this.selectRowCol.onCellChange(3, '',  this.rows[3], this.buildFakeEvent());
      expect(this._selectedRows.length).toEqual(1);
      this.simulateGridKeyDownWithKeyCode(16);
      this.selectRowCol.onCellChange(1, '',  this.rows[1], this.buildFakeEvent());
      expect(this._selectedRows.length).toEqual(2);
    });


    describe('checking header checkbox', function() {
      beforeEach(function() {
        let self = this;
        this._selectedRows = [];
        this._deselectedRows = [];
        this.rows = [{id: '1'}, {id: '2'}];
        let columns = [{name: 'Id', key: 'id'}];
        let rowGetter = function(i) {
          return self.rows[i];
        };
        this.component = this.createComponent({ enableRowSelect: true, rowsCount: this.rows.length, rowGetter: rowGetter, columns: columns, rowSelection: {selectBy: {indexes: []},
          onRowsSelected: function(selectedRows) {
            self._selectedRows = selectedRows;
          },
          onRowsDeselected: function(deselectedRows) {
            self._deselectedRows = deselectedRows;
          }
        }}).node;

        this.baseGrid = this.getBaseGrid();
        this.selectRowCol = this.baseGrid.props.columnMetrics.columns[0];

        // header checkbox
        let checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        this.checkbox = checkboxWrapper.querySelector('input');
        this.fakeEvent = this.buildFakeEvent({ currentTarget: this.checkbox });
        const SelectAll = this.selectRowCol.headerRenderer;
        this.selectAllWrapper = mount(SelectAll);
        this.selectAllWrapper.props().onChange(this.fakeEvent);
      });

      it('should call rowSelection.onRowsSelected with all rows', function() {
        expect(this._selectedRows.length).toBe(2);
      });
    });

    describe('un-checking header checkbox', function() {
      beforeEach(function() {
        let self = this;
        this._selectedRows = [];
        this._deselectedRows = [];
        this.rows = [{id: '1'}, {id: '2'}];
        let columns = [{name: 'Id', key: 'id'}];
        let rowGetter = function(i) {
          return self.rows[i];
        };
        this.component = this.createComponent({ enableRowSelect: true, rowsCount: this.rows.length, rowGetter: rowGetter, columns: columns, rowSelection: {selectBy: {indexes: [0, 1]},
          onRowsSelected: function(selectedRows) {
            self._selectedRows = selectedRows;
          },
          onRowsDeselected: function(deselectedRows) {
            self._deselectedRows = deselectedRows;
          }
        }}).node;

        this.baseGrid = this.getBaseGrid();
        this.selectRowCol = this.baseGrid.props.columnMetrics.columns[0];

        // header checkbox
        let checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        this.checkbox = checkboxWrapper.querySelector('input');
        const SelectAll = this.selectRowCol.headerRenderer;
        this.selectAllWrapper = mount(SelectAll);
      });

      it('then unchecking should call rowSelection.onRowsDeselected with all rows', function() {
        this.checkbox.checked = false;
        this.fakeEvent = this.buildFakeEvent({ currentTarget: this.checkbox });
        this.selectAllWrapper.props().onChange(this.fakeEvent);
        expect(this._deselectedRows.length).toBe(2);
      });
    });
  });

  describe('User Interaction', function() {
    describe('When selected cell is in top corner of grid', function() {
      beforeEach(function() {
        this.component.setState({ selected: { idx: 0, rowIdx: 0 } });
      });

      it('on ArrowUp keyboard event should not change selected index', function() {
        this.simulateGridKeyDown('ArrowUp');
        expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 0 });
      });

      it('on ArrowLeft keyboard event should not change selected index', function() {
        this.simulateGridKeyDown('ArrowLeft');
        expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 0 });
      });
    });

    describe('When selected cell has adjacent cells on all sides', function() {
      beforeEach(function() {
        this.component.setState({ selected: { idx: 1, rowIdx: 1 } });
      });

      it('on ArrowRight keyboard event should increment selected cell index by 1', function() {
        this.simulateGridKeyDown('ArrowRight');
        expect(this.component.state.selected).toEqual({ idx: 2, rowIdx: 1 });
      });

      it('on ArrowDown keyboard event should increment selected row index by 1', function() {
        this.simulateGridKeyDown('ArrowDown');
        expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 2 });
      });

      it('on ArrowLeft keyboard event should decrement selected row index by 1', function() {
        this.simulateGridKeyDown('ArrowLeft');
        expect(this.component.state.selected).toEqual({ idx: 0, rowIdx: 1 });
      });

      it('on ArrowUp keyboard event should decrement selected row index by 1', function() {
        this.simulateGridKeyDown('ArrowUp');
        expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 0 });
      });
    });

    describe('When column is editable', function() {
      beforeEach(function() {
        const editableColumn = Object.assign({ editable: true }, this.columns[1]);
        this.columns[1] = editableColumn;
        this.component = this.createComponent({ columns: this.columns }).node;
      });

      describe('copy a cell value', function() {
        beforeEach(function() {
          const cCharacterKeyCode = 99;
          this.component.setState({ selected: { idx: 1, rowIdx: 1 } });
          this.simulateGridKeyDown(cCharacterKeyCode, true);
        });

        it('should store the value in grid state', function() {
          let expectedCellValue = this._rows[1].title;
          expect(this.component.state.textToCopy).toEqual(expectedCellValue);
          expect(this.component.state.copied).toEqual({ idx: 1, rowIdx: 1 });
        });
      });

      describe('paste a cell value', function() {
        beforeEach(function() {
          let wrapper = this.createComponent();
          const vCharacterKeyCode = 118;
          spyOn(this.testProps, 'onCellCopyPaste');
          wrapper.setProps({ onCellCopyPaste: this.testProps.onCellCopyPaste });
          this.component = wrapper.node;
          this.component.setState({
            textToCopy: 'banana',
            selected: { idx: 1, rowIdx: 5 },
            copied: { idx: 1, rowIdx: 1 }
          });
          this.simulateGridKeyDown(vCharacterKeyCode, true);
        });

        it('should call onCellCopyPaste of component with correct params', function() {
          expect(this.component.props.onCellCopyPaste).toHaveBeenCalled();
          expect(this.component.props.onCellCopyPaste.calls.mostRecent().args[0]).toEqual({
            cellKey: 'title',
            rowIdx: 5,
            value: 'banana',
            fromRow: 1,
            toRow: 5
          });
        });
      });

      describe('cell commit cancel', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: true } });
          this.getCellMetaData().onCommitCancel();
        });

        it('should set grid state inactive', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: false });
        });
      });

      describe('pressing escape', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: true } });
          this.simulateGridKeyDown('Escape');
        });

        it('should set grid state inactive', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: false });
        });
      });

      describe('pressing enter', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: false } });
          this.simulateGridKeyDown('Enter');
        });

        it('should set grid state active', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: true, initialKeyCode: 'Enter' });
        });
      });

      describe('pressing delete', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: false } });
          this.simulateGridKeyDown('Delete');
        });

        it('should set grid state active', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: true, initialKeyCode: 'Delete' });
        });
      });

      describe('pressing backspace', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: false } });
          this.simulateGridKeyDown('Backspace');
        });

        it('should set grid state active', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: true, initialKeyCode: 'Backspace' });
        });
      });

      describe('typing a char', function() {
        beforeEach(function() {
          const fakeEvent = this.buildFakeEvent({ keyCode: 66, key: 'Unidentified' });
          this.component.setState({ selected: { idx: 1, rowIdx: 1, active: false } });
          this.getBaseGrid().props.onViewportKeydown(fakeEvent);
        });

        it('should set grid state active and store the typed value', function() {
          expect(this.component.state.selected).toEqual({ idx: 1, rowIdx: 1, active: true, initialKeyCode: 66 });
        });
      });
    });

    describe('Drag events', function() {
      describe('dragging in grid', function() {
        beforeEach(function() {
          this.component.setState({ selected: { idx: 1, rowIdx: 2 } });
          const event = { target: { className: 'drag-handle' }};
          this.getBaseGrid().props.onViewportDragStart(event);
        });

        it('should store drag rowIdx, idx and value of cell in state', function() {
          const thirdRowTitle = this._rows[2].title;
          expect(this.component.state.dragged).toEqual({ idx: 1, rowIdx: 2, value: thirdRowTitle });
        });
      });

      describe('dragging over a row', function() {
        beforeEach(function() {
          this.component.setState({
            selected: { idx: 1, rowIdx: 2 },
            dragged: { idx: 1, rowIdx: 2, value: 'apple', overRowIdx: 6 }
          });
          this.getCellMetaData().handleDragEnterRow(4);
        });

        it('should store the current rowIdx in grid state', function() {
          expect(this.component.state.dragged).toEqual({ idx: 1, rowIdx: 2, value: 'apple', overRowIdx: 4 });
        });
      });

      describe('finishing drag', function() {
        beforeEach(function() {
          let wrapper = this.createComponent();
          spyOn(this.testProps, 'onCellsDragged');
          wrapper.setProps({ onCellsDragged: this.testProps.onCellsDragged });
          this.component = wrapper.node;
          this.component.setState({
            selected: { idx: 1, rowIdx: 2 },
            dragged: { idx: 1, rowIdx: 2, value: 'apple', overRowIdx: 6 }
          });
          this.getBaseGrid().props.onViewportDragEnd();
        });

        it('should trigger onCellsDragged event and call it with correct params', function() {
          expect(this.component.props.onCellsDragged).toHaveBeenCalled();
          expect(this.component.props.onCellsDragged.calls.argsFor(0)[0]).toEqual({ cellKey: 'title', fromRow: 2, toRow: 6, value: 'apple' });
        });
      });

      describe('terminating drag', function() {
        beforeEach(function() {
          this.component.setState({ dragged: { idx: 1, rowIdx: 2, value: 'apple', overRowIdx: 6 } });
          this.getCellMetaData().handleTerminateDrag();
        });

        it('should clear drag state', function() {
          expect(this.component.state.dragged).toBe(null);
        });
      });
    });

    describe('Adding a new column', function() {
      beforeEach(function() {
        let wrapper = this.createComponent();
        const newColumn = { key: 'isodd', name: 'Is Odd', width: 100 };
        const newColumns = Object.assign([], this.columns);
        newColumns.splice(2, 0, newColumn);
        wrapper.setProps({ columns: newColumns });
        this.component = wrapper.node;
        this.columns = this.component.state.columnMetrics.columns;
      });

      it('should add column', function() {
        expect(this.columns.length).toEqual(5);
      });

      it('should calculate column metrics for added column', function() {
        expect(this.columns[2]).toEqual(jasmine.objectContaining({ key: 'isodd', name: 'Is Odd', width: 100 }));
      });
    });

    describe('Remove a column', function() {
      beforeEach(function() {
        let wrapper = this.createComponent();
        const newColumns = Object.assign([], this.columns);
        newColumns.splice(1, 1);
        wrapper.setProps({ columns: newColumns });
        this.component = wrapper.node;
        this.columns = this.component.state.columnMetrics.columns;
      });

      it('should remove column', function() {
        expect(this.columns.length).toEqual(3);
      });

      it('should no longer include metrics for removed column', function() {
        expect(this.columns[0]).toEqual(jasmine.objectContaining({ key: 'id', name: 'ID', width: 100 }));
        expect(this.columns[1]).toEqual(jasmine.objectContaining({ key: 'count', name: 'Count', width: 100 }));
      });
    });

    describe('outside row/cell', function() {
      beforeEach(function() {
        this.component.setState({ selected: { idx: 1, rowIdx: 1 } });
      });

      it('should deselect currently selected cell on click', function() {
        this.getBaseGrid().props.onViewportClick();
        expect(this.component.state.selected).toEqual(jasmine.objectContaining({ idx: -1, rowIdx: -1 }));
      });

      it('should deselect currently selected cell on double-click', function() {
        this.getBaseGrid().props.onViewportDoubleClick();
        expect(this.component.state.selected).toEqual(jasmine.objectContaining({ idx: -1, rowIdx: -1 }));
      });
    });
  });

  describe('Cell Meta Data', function() {
    it('should create a cellMetaData object and pass to baseGrid as props', function() {
      let meta = this.getCellMetaData();
      expect(meta).toEqual(jasmine.objectContaining({
        selected: { rowIdx: 0, idx: 0 },
        dragged: null,
        copied: null
      }));
      expect(meta.onCellClick).toEqual(jasmine.any(Function));
      expect(meta.onCommit).toEqual(jasmine.any(Function));
      expect(meta.onCommitCancel).toEqual(jasmine.any(Function));
      expect(meta.handleDragEnterRow).toEqual(jasmine.any(Function));
      expect(meta.handleTerminateDrag).toEqual(jasmine.any(Function));
    });

    describe('Changing Grid state', function() {
      beforeEach(function() {
        let newState = {
          selected: { idx: 2, rowIdx: 2 },
          dragged: { idx: 2, rowIdx: 2 }
        };
        this.component.setState(newState);
      });

      it(' should update cellMetaData', function() {
        expect(this.getCellMetaData()).toEqual(jasmine.objectContaining({
          selected: { idx: 2, rowIdx: 2 },
          dragged: { idx: 2, rowIdx: 2 }
        }));
      });
    });

    describe('cell commit', function() {
      beforeEach(function() {
        let wrapper = this.createComponent();
        spyOn(this.testProps, 'onRowUpdated');
        wrapper.setProps({ onRowUpdated: this.testProps.onRowUpdated });
        this.component = wrapper.node;
        this.component.setState({ selected: { idx: 3, rowIdx: 3, active: true } });
        this.getCellMetaData().onCommit(this.buildFakeCellUodate());
      });

      it('should trigger onRowUpdated with correct params', function() {
        const onRowUpdated = this.component.props.onRowUpdated;
        expect(onRowUpdated.calls.mostRecent().args[0]).toEqual(this.buildFakeCellUodate());
      });

      it('should deactivate selected cell', function() {
        expect(this.component.state.selected).toEqual(jasmine.objectContaining({ idx: 3, rowIdx: 3, active: false }));
      });
    });

    describe('Cell click', function() {
      beforeEach(function() {
        this.getCellMetaData().onCellClick({ idx: 2, rowIdx: 2 });
      });

      it('should set selected state of grid', function() {
        expect(this.component.state.selected).toEqual({ idx: 2, rowIdx: 2 });
      });
    });

    describe('Column events', function() {
      let columnWithEvent;
      const eventColumnIdx = 3;
      const eventColumnRowIdx = 2;
      const eventColumnRowId = 2;

      beforeEach(function() {
        columnWithEvent = this.component.state.columnMetrics.columns[3];
        let events = this.testProps.columns[3].events;
        spyOn(events, 'onClick');
        spyOn(events, 'onDoubleClick');
        spyOn(events, 'onDragOver');
      });

      it('should call an event when there is one', function() {
        this.getCellMetaData().onColumnEvent({}, {idx: eventColumnIdx, rowIdx: eventColumnRowIdx, name: 'onClick'});
        expect(columnWithEvent.events.onClick).toHaveBeenCalled();
      });

      it('should call the correct event', function() {
        this.getCellMetaData().onColumnEvent({}, {idx: eventColumnIdx, rowIdx: eventColumnRowIdx, name: 'onClick'});
        expect(columnWithEvent.events.onClick).toHaveBeenCalled();
        expect(columnWithEvent.events.onDoubleClick).not.toHaveBeenCalled();
      });

      it('should call double click event on double click', function() {
        this.getCellMetaData().onColumnEvent({}, {idx: eventColumnIdx, rowIdx: eventColumnRowIdx, name: 'onDoubleClick'});

        expect(columnWithEvent.events.onDoubleClick).toHaveBeenCalled();
      });

      it('should call drag over event on drag over click', function() {
        this.getCellMetaData().onColumnEvent({}, {idx: eventColumnIdx, rowIdx: eventColumnRowIdx, name: 'onDragOver'});

        expect(columnWithEvent.events.onDragOver).toHaveBeenCalled();
      });

      it('should call the event when there is one with the correct args', function() {
        this.getCellMetaData().onColumnEvent({}, {idx: eventColumnIdx, rowIdx: eventColumnRowIdx, rowId: eventColumnRowId, name: 'onClick'});
        expect(columnWithEvent.events.onClick.calls.mostRecent().args).toEqual([{}, {column: columnWithEvent, idx: eventColumnIdx, rowIdx: eventColumnRowIdx, rowId: eventColumnRowId }]);
      });

      it('events should work for the first column', function() {
        const firstColumnIdx = 0;
        let firstColumn = this.component.state.columnMetrics.columns[firstColumnIdx];
        let firstColumnEvents = this.testProps.columns[firstColumnIdx].events;
        spyOn(firstColumnEvents, 'onClick');
        this.getCellMetaData().onColumnEvent({}, {idx: firstColumnIdx, rowIdx: eventColumnRowIdx, rowId: eventColumnRowId, name: 'onClick'});

        expect(firstColumn.events.onClick).toHaveBeenCalled();
      });
    });
  });

  describe('changes to non metric column data', function() {
    beforeEach(function() {
      let wrapper = this.createComponent();
      this.originalMetrics = Object.assign({}, this.component.state.columnMetrics);
      const editableColumn = Object.assign({ editable: true }, this.columns[0]);
      this.columns[0] = editableColumn;
      wrapper.setProps({ columns: this.columns });
      this.component = wrapper.node;
    });

    it('should keep original metric information', function() {
      let columnMetrics = this.component.state.columnMetrics;
      expect(columnMetrics.columns.length).toBeGreaterThan(1);
      columnMetrics.columns.forEach((column, index) => {
        expect(column.width).toEqual(this.originalMetrics.columns[index].width);
        expect(column.left).toEqual(this.originalMetrics.columns[index].left);
      });
    });
  });

  describe('Table width', function() {
    let wrapper;

    beforeEach(function() {
      wrapper = this.createComponent();
      this.component = wrapper.node;
      this.tableElement = ReactDOM.findDOMNode(this.component);
    });

    it('should generate the width based on the container size', function() {
      expect(this.tableElement.style.width).toEqual('100%');
    });

    describe('providing table width as prop', function() {
      beforeEach(function() {
        wrapper.setProps({ minWidth: 900 });
        this.component = wrapper.node;
      });

      it('should set the width of the table', function() {
        expect(this.tableElement.style.width).toEqual('900px');
      });
    });
  });

  describe('onRowClick handler', function() {
    beforeEach(function() {
      let self = this;
      this.rows = [{id: '1', isSelected: true}, {id: '2', isSelected: false}];
      let columns = [{name: 'Id', key: 'id'}, {name: 'Title', key: 'title', width: 100 }];
      let rowGetter = function(i) {
        return self.rows[i];
      };

      this.rowClicked = {};
      this.rowClicks = 0;

      this.component = this.createComponent({rowsCount: this.rows.length, rowGetter: rowGetter, columns: columns, onRowClick: function(rowIdx, row, column) {
        self.rowClicked = {row, column};
        self.rowClicks++;
      }}).node;
    });

    it('calls handler when row (cell) clicked', function() {
      this.getCellMetaData().onCellClick({ idx: 1, rowIdx: 1});
      expect(this.rowClicks).toBe(1);
      const { row, column } = this.rowClicked;
      expect(row).toEqual(jasmine.objectContaining(this.rows[1]));
      expect(column).toEqual(jasmine.objectContaining(this.columns[1]));
    });
  });
});
