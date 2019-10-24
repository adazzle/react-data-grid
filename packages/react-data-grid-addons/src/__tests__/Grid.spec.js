import React from 'react';
import { mount } from 'enzyme';

import Grid from 'react-data-grid';

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

  const getBaseHeader = (wrapper) => {
    return wrapper.find('ForwardRef(Header)');
  };

  const getBaseCanvas = (wrapper) => {
    return wrapper.find('Canvas');
  };

  it('should create a new instance of Grid', () => {
    const { wrapper } = setup();
    expect(wrapper.instance()).toBeDefined();
  });

  it('should render a BaseGrid stub', () => {
    expect(getBaseCanvas(setup().wrapper)).toBeDefined();
  });

  // Set of tests for the props that defined the height of our rows
  describe('when defininig heights on props', () => {
    describe('for defaults props', () => {
      function innerSetup() {
        const { wrapper } = setup({ enableHeaderFilters: true });
        return getBaseHeader(wrapper);
      }

      it('uses the appropriate default for the header row height', () => {
        expect(innerSetup().props().headerRows[0].height).toEqual(35);
      });

      it('uses the appropriate default for the header filter row height', () => {
        expect(innerSetup().props().headerRows[1].height).toEqual(45);
      });
    });

    describe('for a given row height prop', () => {
      function innerSetup() {
        const { wrapper } = setup({ enableHeaderFilters: true, rowHeight: 40 });
        return getBaseHeader(wrapper);
      }

      it('passes the grid row height to the header row when no height to the specific header row is provided', () => {
        expect(innerSetup().props().headerRows[0].height).toEqual(40);
      });

      it('uses the default prop height for the filter row when none is provided', () => {
        expect(innerSetup().props().headerRows[1].height).toEqual(45);
      });
    });

    describe('for given row and header height props', () => {
      function innerSetup() {
        const { wrapper } = setup({
          enableHeaderFilters: true,
          rowHeight: 40,
          headerRowHeight: 50,
          headerFiltersHeight: 60
        });
        return getBaseHeader(wrapper);
      }

      it('passes the correct height to the header row', () => {
        expect(innerSetup().props().headerRows[0].height).toEqual(50);
      });

      it('passes the correct height to the header filter row', () => {
        expect(innerSetup().props().headerRows[1].height).toEqual(60);
      });
    });
  });

  describe('if passed in as props to grid', () => {
    it('should set filter state of grid and render a filterable header row', () => {
      const { wrapper } = setup({ enableHeaderFilters: true });
      expect(getBaseHeader(wrapper).props().headerRows.length).toEqual(2);
    });
  });

  describe('Table width', () => {
    describe('providing table width as prop', () => {
      it('should set the width of the table', () => {
        const { wrapper } = setup();
        wrapper.setProps({ minWidth: 900 });
        expect(wrapper.find('.rdg-root').props().style.width).toEqual(900);
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

      getBaseCanvas(wrapper).props().cellMetaData.onCellClick({ idx: 1, rowIdx: 1 });
      expect(rowClicks).toBe(1);
      const { row, column } = rowClicked;
      expect(row).toMatchObject(rows[1]);
      expect(column).toMatchObject(columns[1]);
    });
  });
});
