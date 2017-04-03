import groupRows from '../RowGrouper';
import Immutable from 'immutable';

const rows = [{ colOne: 'v1', colTwo: 'b1' },
              { colOne: 'v2', colTwo: 'b2' },
              { colOne: 'v1', colTwo: 'b3' }];
const grpDetails = { oneCol: ['colOne'], expRows: {}, multiCol: ['colOne', 'colTwo'] };

describe('Row Grouper', () => {
  it('It can group an array of rows (one grouping column) - correct number of header elements', () => {
    let groupingResult = groupRows(rows, grpDetails.oneCol, grpDetails.expRows);

    expect((groupingResult.filter(x => x.__metaData)).length).toBe(2);
  });
  it('It can group an array of rows (one grouping column) - correct total of elements', () => {
    let groupingResult = groupRows(rows, grpDetails.oneCol, grpDetails.expRows);

    // we should have 5 elements -> 2 group headers + all of the original ones
    expect(groupingResult.length).toBe(5);
  });
  it('It can group an immutable js list of rows (one grouping column)', () => {
    let immutableList = Immutable.fromJS(rows);
    let groupingResult = groupRows(immutableList, grpDetails.oneCol, grpDetails.expRows);

    expect(groupingResult.size).toBe(5);
  });
  it('It can group an array of rows (two grouping columns) - correct number of first nested header elements', () => {
    let groupingResult = groupRows(rows, grpDetails.multiCol, grpDetails.expRows);

    expect(groupingResult
            .slice(0, grpDetails.multiCol.length)
            .every(x => x.__metaData)).toBe(true);
  });
  it('It can group an array of rows (two grouping columns) - correct total of elements', () => {
    let groupingResult = groupRows(rows, grpDetails.multiCol, grpDetails.expRows);

    expect(groupingResult.length).toBe(8);
  });
  it('It can group an immutable js list of rows (two grouping columns)', () => {
    let immutableList = Immutable.fromJS(rows);
    let groupingResult = groupRows(immutableList, grpDetails.multiCol, grpDetails.expRows);

    expect(groupingResult.size).toBe(8);
  });
  it('It can group an immutable js list of rows (two grouping columns) - correct number of first nested header elements', () => {
    let immutableList = Immutable.fromJS(rows);
    let groupingResult = groupRows(immutableList, grpDetails.multiCol, grpDetails.expRows);

    expect(groupingResult
            .slice(0, grpDetails.multiCol.length)
            .every(x => x.__metaData)).toBe(true);
  });
  it('It can group an Immutable List (not list of immutable maps)', () => {
    const immutableList = Immutable.List(rows); // eslint-disable-line new-cap
    const groupingResult = groupRows(immutableList, grpDetails.multiCol, grpDetails.expRows);

    expect(groupingResult
            .slice(0, grpDetails.multiCol.length)
            .every(x => x.__metaData)).toBe(true);
  });
});
