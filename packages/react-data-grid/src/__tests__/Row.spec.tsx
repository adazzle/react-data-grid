import React from 'react';
import { shallow } from 'enzyme';

import Row from '../Row';
import Cell from '../Cell';
import { createColumns } from './utils';
import { getColumn } from '../ColumnUtils';
import { RowRendererProps, CellMetaData } from '../common/types';

describe('Row', () => {
  const COLUMN_COUNT = 50;

  function setup(props: RowRendererProps) {
    const wrapper = shallow<Row>(<Row {...props} />);
    const cells = wrapper.find(Cell);
    return { wrapper, cells };
  }

  const testCellMetaData: CellMetaData = {
    rowKey: 'row',
    onCellClick() {},
    onCellContextMenu() {},
    onCellDoubleClick() {},
    onDragEnter() {},
    onCellExpand() {},
    onRowExpandToggle() {}
  };

  const requiredProperties: RowRendererProps = {
    height: 30,
    columns: createColumns(COLUMN_COUNT),
    row: { key: 'value' },
    cellRenderer: Cell,
    cellMetaData: testCellMetaData,
    idx: 17,
    subRowDetails: {
      canExpand: false,
      field: 'field',
      expanded: false,
      children: [],
      treeDepth: 0,
      siblingIndex: 0,
      numberSiblings: 0
    },
    colOverscanStartIdx: 0,
    colOverscanEndIdx: 20,
    isScrolling: true,
    scrollLeft: 0
  };

  it('passes classname property', () => {
    const { wrapper } = setup(requiredProperties);
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.hasClass('react-grid-Row'));
  });
  it('passes style property', () => {
    const { wrapper } = setup(requiredProperties);
    const draggableDiv = wrapper.find('div').at(0);
    expect(draggableDiv.props().style).toBeDefined();
  });

  describe('Cell rendering', () => {
    describe('When using frozen columns', () => {
      const LAST_LOCKED_CELL_IDX = 5;

      const lockColumns = () => {
        const columns = createColumns(COLUMN_COUNT);
        columns.forEach((c, idx) => c.frozen = idx <= LAST_LOCKED_CELL_IDX);
        return columns;
      };

      it('should render all frozen and visible and overscan cells', () => {
        const columns = lockColumns();
        const { cells } = setup({ ...requiredProperties, columns });
        const { colOverscanStartIdx, colOverscanEndIdx } = requiredProperties;
        const renderedRange = colOverscanEndIdx - colOverscanStartIdx + 1;
        expect(cells.length).toBe(renderedRange);
      });

      it('first frozen cell should be rendered after the unfrozen cells', () => {
        const columns = lockColumns();
        const { cells } = setup({ ...requiredProperties, columns });
        const firstFrozenColumn = columns.filter(c => c.frozen === true)[0];
        expect(cells.at(cells.length - LAST_LOCKED_CELL_IDX - 1).props().column).toBe(firstFrozenColumn);
      });
    });

    describe('When not using frozen columns', () => {
      it('should render all visible and overscan cells', () => {
        const { cells } = setup(requiredProperties);
        const { colOverscanStartIdx, colOverscanEndIdx } = requiredProperties;
        const renderedRange = colOverscanEndIdx - colOverscanStartIdx + 1;
        expect(cells.length).toBe(renderedRange);
      });

      it('first rendered cell index should be colOverscanStartIdx', () => {
        const { cells } = setup(requiredProperties);
        const { columns, colOverscanStartIdx } = requiredProperties;
        const expectedFirstColumn = getColumn(columns, colOverscanStartIdx);
        expect(cells.first().props().column).toBe(expectedFirstColumn);
      });

      it('last rendered cell index should be colOverscanEndIdx', () => {
        const { cells } = setup(requiredProperties);
        const { columns, colOverscanEndIdx } = requiredProperties;
        const expectedLastColumn = getColumn(columns, colOverscanEndIdx);
        expect(cells.last().props().column).toBe(expectedLastColumn);
      });
    });
  });
});
