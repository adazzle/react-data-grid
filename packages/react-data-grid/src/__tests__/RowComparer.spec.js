import {shouldRowUpdate} from '../RowComparer';

let columns = [{ id: 1, key: 'col1', width: 100 }, { id: 2, key: 'col2', width: 100 }];
let cellMetaData = {
  selected: { idx: 2, rowIdx: 3 },
  dragged: null,
  copied: null
};

describe('RowComparer shouldRowUpdate', () => {
  it('same props should not cause an update', () => {
    let currentProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    let nextProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('forceUpdate should cause update', () => {
    let currentProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      forceUpdate: true
    };
    let nextProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('different columns should cause update', () => {
    let newColumns = columns.slice(0);
    newColumns.push({ id: 3, key: 'col3, width: 100' });
    let currentProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    let nextProps = {
      columns: newColumns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });
});
