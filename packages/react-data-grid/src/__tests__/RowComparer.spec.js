import shouldRowUpdate from 'common/utils/RowComparer';

const columns = [{ id: 1, key: 'col1', width: 100 }, { id: 2, key: 'col2', width: 100 }];
const cellMetaData = {
  selected: { idx: 2, rowIdx: 3 },
  dragged: null,
  copied: null
};
const expandedRows = [{key: 'col1'}, {key: 'col2'}];

describe('RowComparer shouldRowUpdate', () => {
  it('same props should not cause an update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('forceUpdate should cause update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      forceUpdate: true
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('different columns should cause update', () => {
    const newColumns = columns.slice(0);
    newColumns.push({ id: 3, key: 'col3, width: 100' });
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    const nextProps = {
      columns: newColumns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('expanded rows should cause update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      expandedRows
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('un-expanding rows should cause update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      expandedRows
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('same expanded rows should not cause update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      expandedRows
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      expandedRows
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('changing row extraClasses should cause update', () => {
    const currentProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      extraClasses: 'row-added'
    };
    const nextProps = {
      columns: columns,
      cellMetaData: cellMetaData,
      extraClasses: 'row-deleted'
    };

    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });
});
