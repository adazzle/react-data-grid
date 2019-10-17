import React from 'react';
import { mount } from 'enzyme';

import InteractionMasks from '../masks/InteractionMasks';
import Canvas, { CanvasProps } from '../Canvas';
import EventBus from '../EventBus';
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn } from '../common/types';
import RowComponent from '../Row';

interface Row {
  id?: number;
  row?: string;
  __metaData?: unknown;
}

const noop = () => null;

const testProps: CanvasProps<Row, 'row'> = {
  rowKey: 'row',
  rowHeight: 25,
  height: 200,
  rowsCount: 1,
  rowGetter() { return {}; },
  cellMetaData: {
    rowKey: 'row',
    onCellClick() { },
    onCellContextMenu() { },
    onCellDoubleClick() { },
    onDragEnter() { },
    onCellExpand() { },
    onRowExpandToggle() { }
  },
  interactionMasksMetaData: {
    onCommit() { },
    onGridRowsUpdated: noop,
    onDragHandleDoubleClick: noop
  },
  onRowSelectionChange() {},
  enableCellSelect: true,
  enableCellAutoFocus: false,
  cellNavigationMode: CellNavigationMode.NONE,
  eventBus: new EventBus(),
  editorPortalTarget: document.body,
  onScroll() {},
  columnMetrics: {
    columns: [{ key: 'id', name: 'ID', idx: 0, width: 100, left: 100 }],
    columnWidths: new Map(),
    lastFrozenColumnIndex: -1,
    minColumnWidth: 80,
    totalColumnWidth: 0,
    viewportWidth: 1000
  },
  renderBatchSize: 8,
  onCanvasKeydown() {},
  onCanvasKeyup() {}
};

function renderComponent(extraProps?: Partial<CanvasProps<Row, 'row'>>) {
  return mount(<Canvas<Row, 'row'> {...testProps} {...extraProps} />);
}

describe('Canvas Tests', () => {
  it('Should render the InteractionMasks component', () => {
    const wrapper = renderComponent();

    expect(wrapper.find(InteractionMasks).props()).toMatchObject({
      rowHeight: 25,
      rowsCount: 1,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 0
    });
  });

  describe('Row Selection', () => {
    it('renders row selected', () => {
      const wrapper = renderComponent({
        rowGetter() { return { row: 'one' }; },
        rowsCount: 1,
        rowKey: 'row',
        selectedRows: new Set(['one'])
      });

      expect(wrapper.find(RowComponent).props().isRowSelected).toBe(true);
    });
  });

  describe('Tree View', () => {
    const COLUMNS: CalculatedColumn<Row>[] = [{ idx: 0, key: 'id', name: 'ID', width: 100, left: 100 }];

    it('can render a custom renderer if __metadata property exists', () => {
      const EmptyChildRow = (props: unknown, rowIdx: number) => {
        return <div key={rowIdx} className="test-row-renderer" />;
      };

      const rowGetter = () => ({
        id: 0,
        __metaData: {
          isGroup: false,
          treeDepth: 0,
          isExpanded: false,
          columnGroupName: 'colgroup',
          columnGroupDisplayName: 'ColGroup',
          getRowRenderer: EmptyChildRow
        }
      });

      const props = {
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: 1,
        columns: COLUMNS,
        rowGetter,
        rowsCount: 1,
        getSubRowDetails() {
          return {
            canExpand: false,
            field: 'field',
            expanded: false,
            children: [
              { id: 'row1-0' },
              { id: 'row1-1' }
            ],
            treeDepth: 1,
            siblingIndex: 1,
            numberSiblings: 2
          };
        }
      };

      const wrapper = renderComponent(props);
      expect(wrapper.find('.test-row-renderer')).toHaveLength(1);
    });
  });
});
