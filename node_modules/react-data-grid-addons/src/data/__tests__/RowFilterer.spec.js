import filterRows from '../RowFilterer';
import {fromJS} from 'immutable';

const rows = [{ colOne: 'v1', colTwo: 'b1' },
              { colOne: 'v2', colTwo: 'b2' },
              { colOne: 'v3', colTwo: 'b3' }];
const filters = { colOne: { filterTerm: 'v1' }};

describe('Row Filterer', () => {
  it('It can filter arrays of rows', () => {
    let filterResult = filterRows(filters, rows);
    expect(filterResult.length).toBe(1);
  });

  it('It can filter an immutable js list of rows', () => {
    let immutableList = fromJS(rows);
    let filterResult = filterRows(filters, immutableList);
    expect(filterResult.size).toBe(1);
  });
});
