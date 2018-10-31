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
    this.component = this.componentWrapper.instance();
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
        this.component = this.createComponent({ toolbar: <ToolBarStub /> }).instance();
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
        this.component = this.createComponent({ toolbar: <ToolBarStub />, rowHeight: 40 }).instance();
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
        this.component = this.createComponent({ toolbar: <ToolBarStub />, rowHeight: 40, headerRowHeight: 50, headerFiltersHeight: 60 }).instance();
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
      this.component = this.createComponent({ toolbar: <ToolBarStub /> }).instance();
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
        expect(this.component.state.canFilter).toBe(true);
        expect(this.baseGrid.props.headerRows.length).toEqual(2);
      });
    });
  });

  describe('When row selection enabled', function() {
    beforeEach(function() {
      this.component = this.createComponent({ enableRowSelect: true}).instance();
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
      }}).instance();
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
        }}).instance();

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
        }}).instance();

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

  describe('changes to non metric column data', function() {
    beforeEach(function() {
      let wrapper = this.createComponent();
      this.originalMetrics = Object.assign({}, this.component.state.columnMetrics);
      const editableColumn = Object.assign({ editable: true }, this.columns[0]);
      this.columns[0] = editableColumn;
      wrapper.setProps({ columns: this.columns });
      this.component = wrapper.instance();
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
      this.component = wrapper.instance();
      this.tableElement = ReactDOM.findDOMNode(this.component);
    });

    it('should generate the width based on the container size', function() {
      expect(this.tableElement.style.width).toEqual('100%');
    });

    describe('providing table width as prop', function() {
      beforeEach(function() {
        wrapper.setProps({ minWidth: 900 });
        this.component = wrapper.instance();
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
      }}).instance();
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
