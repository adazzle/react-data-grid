import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';

import Grid, { CheckboxEditor } from 'react-data-grid';

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
      minWidth: 300,
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
    return wrapper.find('Grid');
  };

  const buildFakeEvent = (addedData) => {
    return {
      preventDefault() {},
      stopPropagation() {},
      ...addedData
    };
  };

  it('should create a new instance of Grid', () => {
    const { wrapper } = setup();
    expect(wrapper.instance()).toBeDefined();
  });

  it('should render a BaseGrid stub', () => {
    expect(getBaseGrid(setup().wrapper)).toBeDefined();
  });

  // Set of tests for the props that defined the height of our rows
  describe('when defininig heigths on props', () => {
    const ToolBarStub = () => null;

    describe('for defaults props', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ toolbar: <ToolBarStub /> }).wrapper;
        wrapper.find(ToolBarStub).props().onToggleFilter();
        wrapper.update();
      });

      it('uses the appropriate default for the grid row height', () => {
        expect(getBaseGrid(wrapper).props().rowHeight).toEqual(35);
      });

      it('uses the appropriate default for the header row height', () => {
        expect(getBaseGrid(wrapper).props().headerRows[0].height).toEqual(35);
      });

      it('uses the appropriate default for the header filter row height', () => {
        expect(getBaseGrid(wrapper).props().headerRows[1].height).toEqual(45);
      });
    });

    describe('for a given row height prop', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ toolbar: <ToolBarStub />, rowHeight: 40 }).wrapper;
        wrapper.find(ToolBarStub).props().onToggleFilter();
        wrapper.update();
      });

      it('passes the correct heigth to the grid rows', () => {
        expect(getBaseGrid(wrapper).props().rowHeight).toEqual(40);
      });

      it('passes the grid row heigth to the header row when no height to the specific header row is provided', () => {
        expect(getBaseGrid(wrapper).props().headerRows[0].height).toEqual(40);
      });

      it('uses the default prop height for the filter row when none is provided', () => {
        expect(getBaseGrid(wrapper).props().headerRows[1].height).toEqual(45);
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
        wrapper.update();
      });

      it('passes the correct heigth to the grid rows', () => {
        expect(getBaseGrid(wrapper).props().rowHeight).toEqual(40);
      });

      it('passes the correct heigth to the header row', () => {
        expect(getBaseGrid(wrapper).props().headerRows[0].height).toEqual(50);
      });

      it('passes the correct heigth to the header filter row', () => {
        expect(getBaseGrid(wrapper).props().headerRows[1].height).toEqual(60);
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
        expect(getBaseGrid(wrapper).props().headerRows.length).toEqual(2);
      });
    });
  });

  describe('When row selection enabled', () => {
    let wrapper;
    let columns;
    let selectRowCol;

    beforeEach(() => {
      ({ wrapper, columns } = setup({ enableRowSelect: true }));
      selectRowCol = getBaseGrid(wrapper).props().columnMetrics.columns[0];
    });

    it('should render an additional Select Row column', () => {
      expect(getBaseGrid(wrapper).props().columnMetrics.columns.length).toEqual(columns.length + 1);
      expect(TestUtils.isElementOfType(selectRowCol.formatter, CheckboxEditor)).toBe(true);
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
      selectRowCol = getBaseGrid(wrapper).props().columnMetrics.columns[0];
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

        const selectRowCol = getBaseGrid(wrapper).props().columnMetrics.columns[0];

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

        const selectRowCol = getBaseGrid(wrapper).props().columnMetrics.columns[0];

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

  describe('Table width', () => {
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

      getBaseGrid(wrapper).props().cellMetaData.onCellClick({ idx: 1, rowIdx: 1 });
      expect(rowClicks).toBe(1);
      const { row, column } = rowClicked;
      expect(row).toMatchObject(rows[1]);
      expect(column).toMatchObject(columns[1]);
    });
  });
});
