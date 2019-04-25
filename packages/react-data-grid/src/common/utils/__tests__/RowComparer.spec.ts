import shouldRowUpdate from '../RowComparer';
import { Column, RowRendererProps } from '../../types';

const columns: Column[] = [
  { key: 'col1', name: 'col1', width: 100, left: 0 },
  { key: 'col2', name: 'col2', width: 100, left: 100 }
];

const defaultProps: RowRendererProps = {
  idx: 0,
  height: 60,
  columns,
  row: {},
  colOverscanStartIdx: 0,
  colOverscanEndIdx: 1,
  isScrolling: false,
  scrollLeft: 0,
  cellRenderer: () => null,
  cellMetaData: {
    rowKey: 'row',
    onCellClick() {},
    onCellContextMenu() {},
    onCellDoubleClick() {},
    onDragEnter() {},
    onCellExpand() {},
    onRowExpandToggle() {}
  },
  subRowDetails: {
    canExpand: false,
    field: 'field',
    expanded: false,
    children: [],
    treeDepth: 0,
    siblingIndex: 0,
    numberSiblings: 0
  }
};

describe('RowComparer shouldRowUpdate', () => {
  it('same props should not cause an update', () => {
    const currentProps = { ...defaultProps };
    const nextProps = { ...defaultProps };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('different columns should cause update', () => {
    const newColumns = [
      ...columns,
      { key: 'col3', name: 'col3', width: 100, left: 200 }
    ];
    const currentProps = { ...defaultProps };
    const nextProps = {
      ...defaultProps,
      columns: newColumns
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('changing row extraClasses should cause update', () => {
    const currentProps = {
      ...defaultProps,
      extraClasses: 'row-added'
    };
    const nextProps = {
      ...defaultProps,
      extraClasses: 'row-deleted'
    };

    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });
});
