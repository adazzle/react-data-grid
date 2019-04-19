import shouldRowUpdate from '../RowComparer';

const columns = [{ id: 1, key: 'col1', width: 100 }, { id: 2, key: 'col2', width: 100 }];
const cellMetaData = {
  selected: { idx: 2, rowIdx: 3 },
  dragged: null,
  copied: null
};

describe('RowComparer shouldRowUpdate', () => {
  it('same props should not cause an update', () => {
    const currentProps = {
      columns,
      cellMetaData
    };
    const nextProps = {
      columns,
      cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('different columns should cause update', () => {
    const newColumns = columns.slice(0);
    newColumns.push({ id: 3, key: 'col3, width: 100' });
    const currentProps = {
      columns,
      cellMetaData
    };
    const nextProps = {
      columns: newColumns,
      cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });

  it('same expanded rows should not cause update', () => {
    const currentProps = {
      columns,
      cellMetaData
    };
    const nextProps = {
      columns,
      cellMetaData
    };
    expect(shouldRowUpdate(nextProps, currentProps)).toBe(false);
  });

  it('changing row extraClasses should cause update', () => {
    const currentProps = {
      columns,
      cellMetaData,
      extraClasses: 'row-added'
    };
    const nextProps = {
      columns,
      cellMetaData,
      extraClasses: 'row-deleted'
    };

    expect(shouldRowUpdate(nextProps, currentProps)).toBe(true);
  });
});
