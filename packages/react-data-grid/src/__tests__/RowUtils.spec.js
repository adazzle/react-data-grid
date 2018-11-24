const RowUtils = require('../RowUtils');

describe('RowUtils Tests', () => {
  describe('isRowSelected', () => {
    describe('using index', () =>{
      it('should return true', () => {
        const result = RowUtils.isRowSelected(null, [0, 2, 4], null, {}, 2);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        const result = RowUtils.isRowSelected(null, [0, 2, 4], null, {}, 1);
        expect(result).toBe(false);
      });
    });

    describe('using keys', () =>{
      it('should return true', () => {
        const keyProps = {rowKey: 'name', values: ['tim', 'willim', 'deigo']};
        const rowData = {id: 1, name: 'tim'};
        const result = RowUtils.isRowSelected(keyProps, null, null, rowData, 0);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        const keyProps = {rowKey: 'name', values: ['tim', 'willim', 'deigo']};
        const rowData = {id: 1, name: 'john'};
        const result = RowUtils.isRowSelected(keyProps, null, null, rowData, 0);
        expect(result).toBe(false);
      });
    });

    describe('using `isSelectedKey`', () =>{
      it('should return true', () => {
        const rowData = {id: 1, name: 'tim', isSelected: true};
        const result = RowUtils.isRowSelected(null, null, 'isSelected', rowData, 0);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        const rowData = {id: 1, name: 'tim', isSelected: false};
        const result = RowUtils.isRowSelected(null, null, 'isSelected', rowData, 0);
        expect(result).toBe(false);
      });
    });
  });
});

