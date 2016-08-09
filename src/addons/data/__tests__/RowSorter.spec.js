import sortRows from '../RowSorter';
import Immutable from 'immutable';

const rows = [{ colOne: 'v1', colTwo: 'b1' },
              { colOne: 'v2', colTwo: 'b2' },
              { colOne: 'v1', colTwo: 'b3' }];
const sortDetails = { sortColumn: 'colOne', sortDirection: 'ASC'};

ddescribe('Row Sorter', () => {
  it('It can sort an array of rows', () => {
    let sortResult = sortRows(rows, sortDetails.sortColumn, sortDetails.sortDirection);

    expect(sortResult[rows.length - 1].colTwo).toBe('b2');
  });

  it('It can sort an immutable js list of rows', () => {
    let immutableList = Immutable.fromJS(rows);
    let sortResult = sortRows(immutableList, sortDetails.sortColumn, sortDetails.sortDirection);
    expect(sortResult.get(rows.length - 1).get('colTwo')).toBe('b2');
  });
});
