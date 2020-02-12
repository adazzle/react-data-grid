import React from 'react';
import { mount } from 'enzyme';

import InteractionMasks from './masks/InteractionMasks';
import Canvas, { CanvasProps } from './Canvas';
import { CellNavigationMode } from './common/enums';
import { CalculatedColumn } from './common/types';
import { ValueFormatter } from './formatters';

interface Row {
  id: number;
  row: string;
}

const noop = () => null;

const testProps: CanvasProps<Row, 'id', unknown> = {
  rowKey: 'id',
  rowHeight: 25,
  height: 200,
  rows: [{ id: 0, row: '0' }],
  onRowsUpdate: noop,
  enableCellAutoFocus: false,
  enableCellCopyPaste: true,
  enableCellDragAndDrop: true,
  cellNavigationMode: CellNavigationMode.NONE,
  editorPortalTarget: document.body,
  onScroll() {},
  columnMetrics: {
    columns: [{
      key: 'row',
      name: 'ID',
      idx: 0,
      width: 100,
      left: 100,
      formatter: ValueFormatter
    }],
    lastFrozenColumnIndex: -1,
    totalColumnWidth: 0,
    viewportWidth: 1000
  },
  viewportColumns: [{
    key: 'row',
    name: 'ID',
    idx: 0,
    width: 100,
    left: 100,
    formatter: ValueFormatter
  }],
  scrollLeft: 0
};

function renderComponent(extraProps?: Partial<CanvasProps<Row, 'id', unknown>>) {
  return mount(<Canvas<Row, 'id', unknown> {...testProps} {...extraProps} />);
}

describe('Canvas', () => {
  it('Should render the InteractionMasks component', () => {
    const wrapper = renderComponent();

    expect(wrapper.find(InteractionMasks).props()).toMatchObject({
      rowHeight: 25
    });
  });

  describe('Tree View', () => {
    const COLUMNS: CalculatedColumn<Row>[] = [{
      idx: 0,
      key: 'id',
      name: 'ID',
      width: 100,
      left: 100,
      formatter: ValueFormatter
    }];

    it('can render a custom renderer if __metadata property exists', () => {
      const EmptyChildRow = (props: unknown, rowIdx: number) => {
        return <div key={rowIdx} className="test-row-renderer" />;
      };

      const rows = [{
        id: 0,
        row: '0',
        __metaData: {
          isGroup: false,
          treeDepth: 0,
          isExpanded: false,
          columnGroupName: 'colgroup',
          columnGroupDisplayName: 'ColGroup',
          getRowRenderer: EmptyChildRow
        }
      }];

      const wrapper = renderComponent({
        viewportColumns: COLUMNS,
        rows
      });
      expect(wrapper.find('.test-row-renderer')).toHaveLength(1);
    });
  });
});
