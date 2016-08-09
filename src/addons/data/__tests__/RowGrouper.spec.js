import groupRows from '../RowGrouper';
import Immutable from 'immutable';

const rows = [{ colOne: 'v1', colTwo: 'b1' },
              { colOne: 'v2', colTwo: 'b2' },
              { colOne: 'v1', colTwo: 'b3' }];
const grpDetails = { grpColumns: ['colOne', 'colTwo'], expRows: {} };

ddescribe('Row Grouper', () => {
  it('It can group an array of rows (no expanded rows) - correct number of header elements', () => {
    let groupingResult = groupRows(rows, grpDetails.grpColumns, grpDetails.expRows);

    expect((groupingResult.filter(x => { return x.__metaData; })).length).toBe(2);
  });
  it('It can group an array of rows (no expanded rows) - correct total of elements', () => {
    let groupingResult = groupRows(rows, grpDetails.grpColumns, grpDetails.expRows);

    // we should have 5 elements -> 2 group headers + all of the original ones
    expect(groupingResult.length).toBe(5);
  });
  it('It can group an immutable js list of rows', () => {
    let immutableList = Immutable.fromJS(rows);
    let groupingResult = groupRows(immutableList, grpDetails.grpColumns, grpDetails.expRows);

    expect(groupingResult.size).toBe(5);
  });
});
