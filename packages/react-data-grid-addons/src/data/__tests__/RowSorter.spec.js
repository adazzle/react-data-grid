import sortRows, {comparer} from '../RowSorter';
import Immutable from 'immutable';

describe('RowSorter', () => {
  let rows = [
    { number: 0, text: 'Z' },
    { number: -1, text: 'A' },
    { number: 2, text: 'a' },
    { number: -2, text: 'beta' },
    { number: 0, text: 'alpha' },
    { number: 9999, text: 'a' }
  ];

  it('should import RowSorter', () => {
    expect(sortRows).toBeDefined();
  });


  describe('with sort direction NONE', () => {
    it('should not sort', () => {
      let rowsSorted = sortRows(rows, 'number', 'NONE');
      for (let i = 0; i < rowsSorted.length; i++) {
        expect(rowsSorted[i]).toEqual(rows[i]);
      }
    });
  });

  describe('with sort direction ASC', () => {
    it('should sort numbers', () => {
      let rowsSorted = sortRows(rows, 'number', 'ASC');
      for (let i = 0; i < rowsSorted.length - 1; i++) {
        expect(rowsSorted[i].number <= rowsSorted[i + 1].number).toBe(true);
      }
    });

    it('should sort text', () => {
      let rowsSorted = sortRows(rows, 'text', 'ASC');
      for (let i = 0; i < rowsSorted.length - 1; i++) {
        expect(rowsSorted[i].text <= rowsSorted[i + 1].text).toBe(true);
      }
    });

    it('It can sort an immutable js list of rows', () => {
      let immutableList = Immutable.fromJS(rows);
      let rowsSorted = sortRows(immutableList, 'text', 'ASC');
      for (let i = 0; i < rowsSorted.size - 1; i++) {
        expect(rowsSorted.get(i).get('text') <= rowsSorted.get(i + 1).get('text')).toBe(true);
      }
    });
  });

  describe('with sort direction DESC', () => {
    it('should sort numbers', () => {
      let rowsSorted = sortRows(rows, 'number', 'DESC');
      for (let i = 0; i < rowsSorted.length - 1; i++) {
        expect(rowsSorted[i].number >= rowsSorted[i + 1].number).toBe(true);
      }
    });

    it('should sort text', () => {
      let rowsSorted = sortRows(rows, 'text', 'DESC');
      for (let i = 0; i < rowsSorted.length - 1; i++) {
        expect(rowsSorted[i].text >= rowsSorted[i + 1].text).toBe(true);
      }
    });
  });

  describe('comparer', () => {
    it('should import comparer', () => {
      expect(comparer).toBeDefined();
    });

    it('should return 1 if greater than', () => {
      expect(comparer(1, 0)).toBe(1);
    });

    it('should return -1 if lower than', () => {
      expect(comparer(0, 1)).toBe(-1);
    });

    it('should return 0 if equal', () => {
      expect(comparer(0, 0)).toBe(0);
    });
  });
});
