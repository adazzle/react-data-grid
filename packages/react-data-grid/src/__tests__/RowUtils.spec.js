const RowUtils = require('../RowUtils');

describe('RowUtils Tests', () => {
  describe('isRowSelected', () => {
    describe('using index', () =>{
      it('should return true', () => {
        let result = RowUtils.isRowSelected(null, [0, 2, 4], null, {}, 2);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        let result = RowUtils.isRowSelected(null, [0, 2, 4], null, {}, 1);
        expect(result).toBe(false);
      });
    });

    describe('using keys', () =>{
      it('should return true', () => {
        let keyProps = {rowKey: 'name', values: ['tim', 'willim', 'deigo']};
        let rowData = {id: 1, name: 'tim'};
        let result = RowUtils.isRowSelected(keyProps, null, null, rowData, 0);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        let keyProps = {rowKey: 'name', values: ['tim', 'willim', 'deigo']};
        let rowData = {id: 1, name: 'john'};
        let result = RowUtils.isRowSelected(keyProps, null, null, rowData, 0);
        expect(result).toBe(false);
      });
    });

    describe('using `isSelectedKey`', () =>{
      it('should return true', () => {
        let rowData = {id: 1, name: 'tim', isSelected: true};
        let result = RowUtils.isRowSelected(null, null, 'isSelected', rowData, 0);
        expect(result).toBe(true);
      });

      it('should return false', () => {
        let rowData = {id: 1, name: 'tim', isSelected: false};
        let result = RowUtils.isRowSelected(null, null, 'isSelected', rowData, 0);
        expect(result).toBe(false);
      });
    });
  });
});

