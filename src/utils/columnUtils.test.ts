import { getColumnMetrics, getColumnScrollPosition, canEdit } from './columnUtils';
import { ValueFormatter } from '../formatters';
import { Column, CalculatedColumn, Omit } from '../common/types';
import { createColumns } from '../test/utils';

describe('getColumnMetrics', () => {
  interface Row {
    id?: number;
    title?: string;
    count?: string;
    frozenColumn1?: string;
    frozenColumn2?: string;
    frozenColumn3?: string;
  }

  const viewportWidth = 300;
  const getInitialColumns = (): Column<Row>[] => [{
    key: 'id',
    name: 'ID',
    width: 60
  }, {
    key: 'title',
    name: 'Title'
  }, {
    key: 'count',
    name: 'Count'
  }];

  it('should set the unset column widths based on the total width', () => {
    const columns = getInitialColumns();
    const metrics = getColumnMetrics({
      columns,
      viewportWidth,
      minColumnWidth: 50,
      columnWidths: new Map(),
      defaultFormatter: ValueFormatter
    });

    expect(metrics.columns[0].width).toStrictEqual(60);
    expect(metrics.columns[1].width).toStrictEqual(120);
    expect(metrics.columns[2].width).toStrictEqual(120);
  });

  it('should set the column left based on the column widths', () => {
    const columns = getInitialColumns();
    const metrics = getColumnMetrics({
      columns,
      viewportWidth,
      minColumnWidth: 50,
      columnWidths: new Map(),
      defaultFormatter: ValueFormatter
    });

    expect(metrics.columns[0].left).toStrictEqual(0);
    expect(metrics.columns[1].left).toStrictEqual(columns[0].width);
    expect(metrics.columns[2].left).toStrictEqual(180);
  });

  it('should shift all frozen columns to the start of column metrics array', () => {
    const firstFrozenColumn: Column<Row> = { key: 'frozenColumn1', name: 'frozenColumn1', frozen: true };
    const secondFrozenColumn: Column<Row> = { key: 'frozenColumn2', name: 'frozenColumn2', frozen: true };
    const thirdFrozenColumn: Column<Row> = { key: 'frozenColumn3', name: 'frozenColumn3', frozen: true };
    const columns = [...getInitialColumns(), secondFrozenColumn, thirdFrozenColumn];
    columns.splice(2, 0, firstFrozenColumn);
    const metrics = getColumnMetrics({
      columns,
      viewportWidth,
      minColumnWidth: 50,
      columnWidths: new Map(),
      defaultFormatter: ValueFormatter
    });
    expect(metrics.columns[0]).toMatchObject(firstFrozenColumn);
    expect(metrics.columns[1]).toMatchObject(secondFrozenColumn);
    expect(metrics.columns[2]).toMatchObject(thirdFrozenColumn);
  });
});

describe('getColumnScrollPosition', () => {
  describe('When canvas is scrolled left', () => {
    it('should calculate the scroll position for the selected column', () => {
      const columns = createColumns(10);
      const scrollPosition = getColumnScrollPosition(columns, 4, 500, 100);
      expect(scrollPosition).toBe(-100);
    });

    describe('When columns are frozen', () => {
      it('should calculate the scroll position for the selected column', () => {
        const columns = createColumns(10);
        columns[0].frozen = true;
        columns[1].frozen = true;
        const scrollPosition = getColumnScrollPosition(columns, 4, 500, 100);
        expect(scrollPosition).toBe(-300);
      });
    });
  });

  describe('When canvas is scrolled right', () => {
    it('should calculate the scroll position for the selected column', () => {
      const columns = createColumns(10);
      const scrollPosition = getColumnScrollPosition(columns, 7, 500, 100);
      expect(scrollPosition).toBe(200);
    });

    describe('When columns are frozen', () => {
      it('should calculate the scroll position for the selected column', () => {
        const columns = createColumns(10);
        columns[0].frozen = true;
        columns[1].frozen = true;
        const scrollPosition = getColumnScrollPosition(columns, 7, 500, 100);
        expect(scrollPosition).toBe(200);
      });
    });

    it('should calculate the scroll position for the selected column when client width is greater than the scroll width', () => {
      const columns = createColumns(10);
      columns[0].frozen = true;
      columns[1].frozen = true;
      const scrollPosition = getColumnScrollPosition(columns, 7, 500, 400);
      expect(scrollPosition).toBe(0);
    });
  });
});

describe('canEdit', () => {
  interface Row {
    PlacementType?: string;
  }

  function setup() {
    const col: CalculatedColumn<Row> = {
      idx: 0,
      editable: true,
      editor: () => null,
      filterable: true,
      key: 'PlacementType',
      left: 460,
      name: 'Adserver Placement Type',
      resizable: true,
      width: 150,
      formatter: ValueFormatter
    };

    return {
      col,
      RowData: {
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
  }

  let testProps: Omit<ReturnType<typeof setup>, 'enableCellSelect'> & { enableCellSelect?: boolean } = setup();

  afterEach(() => {
    testProps = setup();
  });

  describe('canEdit tests', () => {
    describe('canEdit tests using undefineds', () => {
      it('CanEdit returns true when col.editable is undefined but col.editor is defined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = () => null;
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).not.toBeUndefined();
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is undefined, col.editor is undefined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = undefined;
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).toBeUndefined();
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is undefined', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBeUndefined();
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is undefined and enableCellSelect is undefined', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.enableCellSelect = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBeUndefined();
        expect(result).toBe(false);
      });
    });

    describe('canEdit tests using nulls', () => {
      it('CanEdit returns true when col.editable is null but col.editor is defined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = () => null;
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).not.toBeNull();
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is null, col.editor is undefined and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.col.editor = undefined;
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editor).toBeUndefined();
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is null', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBeUndefined();
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is null and enableCellSelect is null', () => {
        // Arrange
        testProps.col.editable = undefined;
        testProps.enableCellSelect = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(testProps.col.editable).toBeUndefined();
        expect(testProps.enableCellSelect).toBeUndefined();
        expect(result).toBe(false);
      });
    });

    describe('canEdit tests using booleans', () => {
      it('CanEdit returns true when col.editable is true and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('boolean');
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is false and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = false;
        testProps.enableCellSelect = true;
        testProps.col.editor = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('boolean');
        expect(testProps.col.editable).toBe(false);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is true and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = true;
        testProps.enableCellSelect = false;
        testProps.col.editor = undefined;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('boolean');
        expect(testProps.col.editable).toBe(true);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is false and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = false;
        testProps.enableCellSelect = false;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('boolean');
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
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('function');
        expect(testProps.col.editable({})).toBe(true);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(true);
      });

      it('CanEdit returns false when col.editable is a function which returns false and enableCellSelect is true', () => {
        // Arrange
        testProps.col.editable = () => { return false; };
        testProps.enableCellSelect = true;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('function');
        expect(testProps.col.editable({})).toBe(false);
        expect(testProps.enableCellSelect).toBe(true);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is a function which returns true and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = () => { return true; };
        testProps.enableCellSelect = false;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('function');
        expect(testProps.col.editable({})).toBe(true);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });

      it('CanEdit returns false when col.editable is a function which returns false and enableCellSelect is false', () => {
        // Arrange
        testProps.col.editable = () => { return false; };
        testProps.enableCellSelect = false;

        // Act
        const result = canEdit(testProps.col, testProps.RowData, testProps.enableCellSelect);

        // Assert
        expect(typeof testProps.col.editable).toBe('function');
        expect(testProps.col.editable({})).toBe(false);
        expect(testProps.enableCellSelect).toBe(false);
        expect(result).toBe(false);
      });
    });
  });
});
