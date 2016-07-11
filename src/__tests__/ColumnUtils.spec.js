import React from 'react';
import ColumnUtils from '../ColumnUtils';
import ReactDOM from 'react-dom';
const cloneElement = React.cloneElement;

const render = function(element, mountPoint) {
  let mount = mountPoint || document.createElement('div');
  let instance = ReactDOM.render(element, mount);

  if (!instance.renderWithProps) {
    instance.renderWithProps = function(newProps) {
      return render(
       cloneElement(element, newProps), mount);
    };
  }
  return instance;
};


describe('ColumnUtils tests', () => {
  let testProps = {
    col: {
      editable: true,
      editor: {},
      filterable: true,
      formatOptions: '',
      formula: '',
      getRowMetaData: undefined,
      key: 'PlacementType',
      left: 460,
      name: 'Adserver Placement Type',
      options: [
        'Tracking',
        'Display'
      ],
      required: false,
      resizable: true,
      width: 150
    },
    rowData: {
      CostModel: 'CPM',
      Dimensions: '468x60',
      EndDate: '17 Apr 16',
      ExternalSiteName: 'Crimtan',
      FloodlightActivityId: null,
      FloodlightActivityName: null,
      FormatAdditionalInfo: '',
      FormatBasicDescription: 'Banner - Standard (468x60)',
      InactivePlacementId: 'False',
      NumberOfUnits: '147223',
      PackageId: '522140',
      PackageName: 'BannerFull (468x60), Leaderboard (728x90), Mpu (300x250)',
      PlacementId: '11212201702442',
      PlacementType: 'Display',
      RowState: 0,
      Section: 'Run of Site',
      SentToAdserver: 'True',
      StartDate: '14 Mar 16',
      SupplierId: '20966',
      SupplierName: 'CrimTan',
      TotalCost: '0',
      UnitCost: '0',
      adServingFormat: 'VAST',
      additionalPlacementInfo: '1',
      addtlUnitDimensions: '15s',
      deviceType: 'D',
      executionId: '502859',
      isSiteMatched: 'True',
      os: 'IOS',
      placementName: 'CrimTan>>RunofSite>>468x60>>15s>> >>D>>CPM>>AUT>>W>>IOS>>VAST>> >>1',
      targetAudienceType: 'AUT',
      techType: 'Serving',
      webOrApp: 'W'
    },
    enableCellSelect: true
  };

  describe('canEdit tests', () => {
    describe('canEdit tests using undefineds', () => {
      it('CanEdit returns true when col.editable is undefined but col.editor is defined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = {};
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).not.toBe(undefined);
        expect(testProps.col.editable).toBe(undefined);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is undefined, col.editor is undefined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = undefined;
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).toBe(undefined);
        expect(testProps.col.editable).toBe(undefined);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is undefined', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = undefined;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(undefined);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is undefined and enableCellSelect is undefined', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.enableCellSelect = undefined;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(undefined);
        expect(testProps.enableCellSelect).toBe(undefined);
        expect(result).toBe(false);
      });
    });

    describe('canEdit tests using nulls', () => {
      it('CanEdit returns true when col.editable is null but col.editor is defined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = null;
        testProps.col.editor = {};
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).not.toBe(null);
        expect(testProps.col.editable).toBe(null);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is null, col.editor is null and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = null;
        testProps.col.editor = null;
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).toBe(null);
        expect(testProps.col.editable).toBe(null);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is null', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = null;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(null);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is null and enableCellSelect is null', () => {
        // Arrange
        testProps.col.editable = null;
        testProps.enableCellSelect = null;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(null);
        expect(testProps.enableCellSelect).toBe(null);
        expect(result).toBe(false);
      });
    });

    describe('canEdit tests using booleans', () => {
      it('CanEdit returns true when col.editable is true and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('boolean');
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is false and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = false;
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('boolean');
        expect(testProps.col.editable).toBe(false);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = false;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('boolean');
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is false and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = false;
        testProps.enableCellSelect = false;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('boolean');
        expect(testProps.col.editable).toBe(false);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });
    });

    describe('canEdit tests with col.editable as a function', () => {
      it('CanEdit returns true when col.editable is a function which returns true and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = () => { return true; };
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('function');
        expect(testProps.col.editable()).toBe(true);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is a function which returns false and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = () => { return false; };
        testProps.enableCellSelect = true;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('function');
        expect(testProps.col.editable()).toBe(false);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is a function which returns true and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = () => { return true; };
        testProps.enableCellSelect = false;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('function');
        expect(testProps.col.editable()).toBe(true);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is a function which returns false and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = () => { return false; };
        testProps.enableCellSelect = false;

        // Act
        let result = ColumnUtils.canEdit(testProps.col, testProps. RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof(testProps.col.editable)).toBe('function');
        expect(testProps.col.editable()).toBe(false);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });
    });
  });
});
