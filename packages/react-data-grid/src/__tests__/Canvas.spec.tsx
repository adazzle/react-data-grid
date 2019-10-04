import React from 'react';
import { shallow } from 'enzyme';

import InteractionMasks from '../masks/InteractionMasks';
import Canvas, { CanvasProps } from '../Canvas';
import EventBus from '../masks/EventBus';
import { CellNavigationMode } from '../common/enums';
import { CalculatedColumn } from '../common/types';

interface Row {
  id?: number;
  row?: string;
  __metaData?: unknown;
}

const noop = () => null;
const getRows = (wrp: ReturnType<typeof renderComponent>) => wrp.find('.rdg-rows-container').props().children as JSX.Element[];

const testProps: CanvasProps<Row> = {
  rowKey: 'row',
  rowHeight: 25,
  height: 200,
  rowOverscanStartIdx: 1,
  rowOverscanEndIdx: 10,
  rowVisibleStartIdx: 0,
  rowVisibleEndIdx: 10,
  colVisibleStartIdx: 0,
  colVisibleEndIdx: 100,
  colOverscanStartIdx: 0,
  colOverscanEndIdx: 100,
  rowsCount: 1,
  columns: [],
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
  isScrolling: false,
  enableCellSelect: true,
  enableCellAutoFocus: false,
  cellNavigationMode: CellNavigationMode.NONE,
  eventBus: new EventBus(),
  editorPortalTarget: document.body,
  width: 1000,
  onScroll() {},
  lastFrozenColumnIndex: 0,
  scrollTop: 0,
  scrollLeft: 0
};

function renderComponent(extraProps?: Partial<CanvasProps<Row>>) {
  return shallow<Canvas<Row>>(<Canvas<Row> {...testProps} {...extraProps} />);
}

describe('Canvas Tests', () => {
  it('Should not call setScroll on render', () => {
    const wrapper = renderComponent();
    const testElementNode = wrapper.instance();

    jest.spyOn(testElementNode, 'setScrollLeft').mockImplementation(() => { });
    expect(testElementNode.setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should not call setScroll on update', () => {
    const wrapper = renderComponent();
    const testElementNode = wrapper.instance();

    jest.spyOn(testElementNode, 'setScrollLeft').mockImplementation(() => { });
    testElementNode.componentDidUpdate(testProps);
    expect(testElementNode.setScrollLeft).not.toHaveBeenCalled();
  });

  it('Should render the InteractionMasks component', () => {
    const wrapper = renderComponent();

    expect(wrapper.find(InteractionMasks).props()).toMatchObject({
      rowHeight: 25,
      rowsCount: 1,
      rowVisibleStartIdx: 0,
      rowVisibleEndIdx: 10,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 100
    });
  });

  describe('Row Selection', () => {
    it('renders row selected', () => {
      const rowGetter = () => ({ id: 1 });

      const wrapper = renderComponent({
        rowOverscanStartIdx: 0,
        rowOverscanEndIdx: 1,
        columns: [{ key: 'id', name: 'ID', idx: 0, width: 100, left: 100 }],
        rowGetter,
        rowsCount: 1,
        rowKey: 'id',
        selectedRows: new Set([1])
      });
      const rows = getRows(wrapper);

      expect(rows[0].props.isRowSelected).toBe(true);
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
      const rows = getRows(wrapper);
      expect(rows[0].props.className).toBe('test-row-renderer');
    });
  });
});
