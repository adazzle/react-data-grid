import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';

import Grid, { editors } from 'react-data-grid';
import mockStateObject from './data/MockStateObject';

const { CheckboxEditor } = editors;

describe('Grid', () => {
  const setup = (extraProps) => {
    const columns = [
      { key: 'id', name: 'ID', width: 100, events: { onClick() {} } },
      { key: 'title', name: 'Title', width: 100 },
      { key: 'count', name: 'Count', width: 100 },
      { key: 'country', name: 'Country', width: 100, events: { onClick() {}, onDoubleClick() {}, onDragOver() {} } }
    ];

    const rows = [];

    for (let i = 0; i < 1000; i++) {
      rows.push({
        id: i,
        title: `Title ${i}`,
        count: i * 1000,
        isOdd: !!(i % 2)
      });
    }

    const props = {
      enableCellSelect: true,
      columns,
      rowGetter(i) { return rows[i]; },
      rowsCount: rows.length,
      width: 300,
      onCellCopyPaste() {},
      onGridSort() {},
      onAddFilter() {},
      rowKey: 'id',
      ...extraProps
    };

    const wrapper = mount(<Grid {...props} />);

    return { wrapper, props, columns, rows };
  };

  const getBaseGrid = (wrapper) => {
    return wrapper.instance().base.current;
  };

  const buildFakeEvent = (addedData) => {
    return {
      preventDefault() {},
      stopPropagation() {},
      ...addedData
    };
  };

  const simulateGridKeyDownWithKeyCode = (wrapper, keyCode) => {
    getBaseGrid(wrapper).props.onViewportKeydown(buildFakeEvent({ keyCode }));
  };

  it('should create a new instance of Grid', () => {
    const { wrapper } = setup();
    expect(wrapper.instance()).toBeDefined();
  });

  it('should render a BaseGrid stub', () => {
    expect(getBaseGrid(setup().wrapper)).toBeDefined();
  });

  it('should be initialized with correct state', () => {
    const { wrapper, columns } = setup();
    const events = [columns[0].events, columns[1].events, columns[2].events, columns[3].events];
    expect(wrapper.instance().state).toEqual(mockStateObject({
      selectedRows: []
    }, events));
  });

  // Set of tests for the props that defined the height of our rows
  describe('when defininig heigths on props', () => {
    const ToolBarStub = () => null;

    describe('for defaults props', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ toolbar: <ToolBarStub /> }).wrapper;
        wrapper.find(ToolBarStub).props().onToggleFilter();
      });

      it('uses the appropriate default for the grid row height', () => {
        expect(getBaseGrid(wrapper).props.rowHeight).toEqual(35);
      });

      it('uses the appropriate default for the header row height', () => {
        expect(getBaseGrid(wrapper).props.headerRows[0].height).toEqual(35);
      });

      it('uses the appropriate default for the header filter row height', () => {
        expect(getBaseGrid(wrapper).props.headerRows[1].height).toEqual(45);
      });
    });

    describe('for a given row height prop', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ toolbar: <ToolBarStub />, rowHeight: 40 }).wrapper;
        wrapper.find(ToolBarStub).props().onToggleFilter();
      });

      it('passes the correct heigth to the grid rows', () => {
        expect(getBaseGrid(wrapper).props.rowHeight).toEqual(40);
      });

      it('passes the grid row heigth to the header row when no height to the specific header row is provided', () => {
        expect(getBaseGrid(wrapper).props.headerRows[0].height).toEqual(40);
      });

      it('uses the default prop height for the filter row when none is provided', () => {
        expect(getBaseGrid(wrapper).props.headerRows[1].height).toEqual(45);
      });
    });

    describe('for given row and header height props', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({
          toolbar: <ToolBarStub />,
          rowHeight: 40,
          headerRowHeight: 50,
          headerFiltersHeight: 60
        }).wrapper;
        wrapper.find(ToolBarStub).props().onToggleFilter();
      });

      it('passes the correct heigth to the grid rows', () => {
        expect(getBaseGrid(wrapper).props.rowHeight).toEqual(40);
      });

      it('passes the correct heigth to the header row', () => {
        expect(getBaseGrid(wrapper).props.headerRows[0].height).toEqual(50);
      });

      it('passes the correct heigth to the header filter row', () => {
        expect(getBaseGrid(wrapper).props.headerRows[1].height).toEqual(60);
      });
    });
  });

  describe('if passed in as props to grid', () => {
    const ToolBarStub = () => null;
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ toolbar: <ToolBarStub /> }).wrapper;
    });

    it('should render a Toolbar', () => {
      expect(wrapper.find(ToolBarStub).instance()).toBeDefined();
    });

    describe('onToggleFilter trigger of Toolbar', () => {
      beforeEach(() => {
        wrapper.find(ToolBarStub).props().onToggleFilter();
      });

      it('should set filter state of grid and render a filterable header row', () => {
        expect(wrapper.instance().state.canFilter).toBe(true);
        expect(getBaseGrid(wrapper).props.headerRows.length).toEqual(2);
      });
    });
  });

  describe('When row selection enabled', () => {
    let wrapper;
    let columns;
    let rows;
    let selectRowCol;

    beforeEach(() => {
      ({ wrapper, columns, rows } = setup({ enableRowSelect: true }));
      selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];
    });

    it('should render an additional Select Row column', () => {
      expect(getBaseGrid(wrapper).props.columnMetrics.columns.length).toEqual(columns.length + 1);
      expect(selectRowCol.key).toEqual('select-row');
      expect(TestUtils.isElementOfType(selectRowCol.formatter, CheckboxEditor)).toBe(true);
    });

    describe('checking header checkbox', () => {
      let checkbox;
      let selectAllWrapper;
      let fakeEvent;

      beforeEach(() => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        checkbox = checkboxWrapper.querySelector('input');
        const SelectAll = selectRowCol.headerRenderer;
        selectAllWrapper = mount(SelectAll);
        fakeEvent = buildFakeEvent({ currentTarget: checkbox });
        selectAllWrapper.props().onChange(fakeEvent);
      });

      it('should select all rows', () => {
        const selectedRows = wrapper.instance().state.selectedRows;
        expect(selectedRows.length).toEqual(rows.length);

        expect(selectedRows.length).toBeGreaterThan(1);
        selectedRows.forEach((selected) => expect(selected.isSelected).toBe(true));
      });

      describe('and then unchecking header checkbox', () => {
        beforeEach(() => {
          checkbox.checked = false;
          selectAllWrapper.props().onChange(fakeEvent);
        });

        it('should deselect all rows', () => {
          const selectedRows = wrapper.instance().state.selectedRows;

          expect(selectedRows.length).toBeGreaterThan(1);
          selectedRows.forEach((selected) => expect(selected.isSelected).toBe(false));
        });
      });
    });

    describe('when selected is false', () => {
      beforeEach(() => {
        wrapper.instance().setState({ selectedRows: [{ id: 0, isSelected: false }, { id: 1, isSelected: false }, { id: 2, isSelected: false }, { id: 3, isSelected: false }] });
        const selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];
        selectRowCol.onCellChange(3, 'select-row', rows[3], buildFakeEvent());
      });

      it('should be able to select an individual row', () => {
        expect(wrapper.instance().state.selectedRows[3].isSelected).toBe(true);
      });
    });

    describe('when selected is null', () => {
      beforeEach(() => {
        wrapper.instance().setState({ selectedRows: [{ id: 0, isSelected: null }, { id: 1, isSelected: null }, { id: 2, isSelected: null }, { id: 3, isSelected: null }] });
        const selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];
        selectRowCol.onCellChange(2, 'select-row', rows[2], buildFakeEvent());
      });

      it('should be able to select an individual row', () => {
        expect(wrapper.instance().state.selectedRows[2].isSelected).toBe(true);
      });
    });

    describe('when selected is true', () => {
      beforeEach(() => {
        wrapper.instance().setState({ selectedRows: [{ id: 0, isSelected: null }, { id: 1, isSelected: true }, { id: 2, isSelected: true }, { id: 3, isSelected: true }] });
        const selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];
        selectRowCol.onCellChange(3, 'select-row', rows[3], buildFakeEvent());
      });

      it('should be able to unselect an individual row ', () => {
        expect(wrapper.instance().state.selectedRows[3].isSelected).toBe(false);
      });
    });
  });

  describe('When selection enabled and using rowSelection props', () => {
    let selectRowCol;
    let rows;
    let _selectedRows;
    let _deselectedRows;
    let wrapper;

    beforeEach(() => {
      _deselectedRows = [];
      rows = [{ id: '1', isSelected: true }, { id: '2', isSelected: false }, { id: '3', isSelected: false }, { id: '4', isSelected: false }];
      const columns = [{ name: 'Id', key: 'id' }];
      wrapper = setup({
        rowsCount: rows.length,
        rowGetter(i) { return rows[i]; },
        columns,
        rowSelection: {
          enableShiftSelect: true,
          selectBy: { isSelectedKey: 'isSelected' },
          onRowsSelected(selectedRows) {
            _selectedRows = selectedRows;
          },
          onRowsDeselected(deselectedRows) {
            _deselectedRows = deselectedRows;
          }
        }
      }).wrapper;
      selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];
    });

    it('should call rowSelection.onRowsSelected when row selected', () => {
      selectRowCol.onCellChange(1, '', rows[1], buildFakeEvent());
      expect(_selectedRows.length).toBe(1);
      expect(_selectedRows[0].rowIdx).toBe(1);
      expect(_selectedRows[0].row).toBe(rows[1]);
    });

    it('should call rowSelection.onRowsDeselected when row de-selected', () => {
      selectRowCol.onCellChange(0, '', rows[0], buildFakeEvent());
      expect(_deselectedRows.length).toBe(1);
      expect(_deselectedRows[0].rowIdx).toBe(0);
      expect(_deselectedRows[0].row).toBe(rows[0]);
    });

    it('should set lastRowIdxUiSelected state', () => {
      selectRowCol.onCellChange(1, '', rows[1], buildFakeEvent());
      expect(wrapper.instance().state.lastRowIdxUiSelected).toEqual(1);
    });

    it('should select range when shift selecting below selected row', () => {
      selectRowCol.onCellChange(1, '', rows[1], buildFakeEvent());
      expect(_selectedRows.length).toEqual(1);
      simulateGridKeyDownWithKeyCode(wrapper, 16);
      selectRowCol.onCellChange(3, '', rows[3], buildFakeEvent());
      expect(_selectedRows.length).toEqual(2);
    });

    it('should select range when shift selecting above selected row', () => {
      selectRowCol.onCellChange(3, '', rows[3], buildFakeEvent());
      expect(_selectedRows.length).toEqual(1);
      simulateGridKeyDownWithKeyCode(wrapper, 16);
      selectRowCol.onCellChange(1, '', rows[1], buildFakeEvent());
      expect(_selectedRows.length).toEqual(2);
    });

    describe('checking header checkbox', () => {
      it('should call rowSelection.onRowsSelected with all rows', () => {
        let _selectedRows = [];
        const rows = [{ id: '1' }, { id: '2' }];
        const columns = [{ name: 'Id', key: 'id' }];
        const { wrapper } = setup({
          enableRowSelect: true,
          rowsCount: rows.length,
          rowGetter(i) { return rows[i]; },
          columns,
          rowSelection: {
            selectBy: { indexes: [] },
            onRowsSelected(selectedRows) {
              _selectedRows = selectedRows;
            }
          }
        });

        const selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];

        // header checkbox
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        const checkbox = checkboxWrapper.querySelector('input');
        const fakeEvent = buildFakeEvent({ currentTarget: checkbox });
        const SelectAll = selectRowCol.headerRenderer;
        const selectAllWrapper = mount(SelectAll);
        selectAllWrapper.props().onChange(fakeEvent);

        expect(_selectedRows.length).toBe(2);
      });
    });

    describe('un-checking header checkbox', () => {
      it('then unchecking should call rowSelection.onRowsDeselected with all rows', () => {
        let _deselectedRows = [];
        const rows = [{ id: '1' }, { id: '2' }];
        const columns = [{ name: 'Id', key: 'id' }];
        const { wrapper } = setup({
          enableRowSelect: true,
          rowsCount: rows.length,
          rowGetter(i) { return rows[i]; },
          columns,
          rowSelection: {
            selectBy: { indexes: [0, 1] },
            onRowsDeselected(deselectedRows) {
              _deselectedRows = deselectedRows;
            }
          }
        });

        const selectRowCol = getBaseGrid(wrapper).props.columnMetrics.columns[0];

        // header checkbox
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.innerHTML = '<input type="checkbox" value="value" checked="true" />';
        const checkbox = checkboxWrapper.querySelector('input');
        const SelectAll = selectRowCol.headerRenderer;
        const selectAllWrapper = mount(SelectAll);

        checkbox.checked = false;
        const fakeEvent = buildFakeEvent({ currentTarget: checkbox });
        selectAllWrapper.props().onChange(fakeEvent);

        expect(_deselectedRows.length).toBe(2);
      });
    });
  });

  describe('changes to non metric column data', () => {
    it('should keep original metric information', () => {
      const { wrapper, columns } = setup();
      const component = wrapper.instance();
      const originalMetrics = { ...component.state.columnMetrics };
      columns[0].editable = true;
      wrapper.setProps({ columns });
      const { columnMetrics } = component.state;

      expect(columnMetrics.columns.length).toBeGreaterThan(1);
      columnMetrics.columns.forEach((column, index) => {
        expect(column.width).toEqual(originalMetrics.columns[index].width);
        expect(column.left).toEqual(originalMetrics.columns[index].left);
      });
    });
  });

  describe('Table width', () => {
    it('should generate the width based on the container size', () => {
      const { wrapper } = setup();
      const tableElement = ReactDOM.findDOMNode(wrapper.instance());
      expect(tableElement.style.width).toEqual('100%');
    });

    describe('providing table width as prop', () => {
      it('should set the width of the table', () => {
        const { wrapper } = setup();
        wrapper.setProps({ minWidth: 900 });
        const tableElement = ReactDOM.findDOMNode(wrapper.instance());
        expect(tableElement.style.width).toEqual('900px');
      });
    });
  });

  describe('onRowClick handler', () => {
    it('calls handler when row (cell) clicked', () => {
      const rows = [{ id: '1', isSelected: true }, { id: '2', isSelected: false }];
      const columns = [{ name: 'Id', key: 'id' }, { name: 'Title', key: 'title', width: 100 }];

      let rowClicked = {};
      let rowClicks = 0;

      const { wrapper } = setup({
        rowsCount: rows.length,
        rowGetter(i) { return rows[i]; },
        columns,
        onRowClick(rowIdx, row, column) {
          rowClicked = { row, column };
          rowClicks++;
        }
      });

      getBaseGrid(wrapper).props.cellMetaData.onCellClick({ idx: 1, rowIdx: 1 });
      expect(rowClicks).toBe(1);
      const { row, column } = rowClicked;
      expect(row).toMatchObject(rows[1]);
      expect(column).toMatchObject(columns[1]);
    });
  });
});
