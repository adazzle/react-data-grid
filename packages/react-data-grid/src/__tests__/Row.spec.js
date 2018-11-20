import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Row from '../Row';
import Cell from '../Cell';
import { shallow } from 'enzyme';
import {createColumns} from '../__tests__/utils/createColumns';

describe('Row', () => {
  const fakeProps = {
    height: 35,
    columns: [],
    row: [],
    idx: 0
  };

  it('should create an instance of Row', () => {
    const component = TestUtils.renderIntoDocument(<Row {...fakeProps} />);
    expect(component).toBeDefined();
  });

  describe('with extra classes', () => {
    const fakeExtraClasses = ['row-extra-class', 'row-extra-extra-class'];

    it('should have extra classes', () => {
      const newProps = Object.assign({}, fakeProps, {extraClasses: fakeExtraClasses.join(' ')});
      const component = TestUtils.renderIntoDocument(<Row {...newProps} />);

      const row = TestUtils.findRenderedDOMComponentWithClass(component, 'react-grid-Row');
      fakeExtraClasses.forEach((c) => {
        const containsExtraClass = row.className.indexOf(c) > -1;
        expect(containsExtraClass).toBe(true);
      });
    });
  });

  describe('Rendering Row component', () => {
    const COLUMN_COUNT = 50;

    const setup = (props) => {
      const wrapper = shallow(<Row {...props} />);
      const cells = wrapper.find(Cell);
      return {wrapper, cells};
    };

    const requiredProperties = {
      height: 30,
      columns: createColumns(COLUMN_COUNT),
      row: {key: 'value'},
      idx: 17,
      colVisibleStartIdx: 2,
      colVisibleEndIdx: 20,
      colOverscanStartIdx: 0,
      colOverscanEndIdx: 20,
      isScrolling: true
    };

    const allProperties = {
      height: 35,
      columns: createColumns(COLUMN_COUNT),
      row: {key: 'value', name: 'name'},
      cellRenderer: jasmine.createSpy(),
      cellMetaData: {
        selected: {idx: 2, rowIdx: 3},
        dragged: null,
        onCellClick: jasmine.createSpy(),
        onCellContextMenu: jasmine.createSpy(),
        onCellDoubleClick: jasmine.createSpy(),
        onCommit: jasmine.createSpy(),
        onCommitCancel: jasmine.createSpy(),
        copied: null,
        handleDragEnterRow: jasmine.createSpy(),
        handleTerminateDrag: jasmine.createSpy(),
        onColumnEvent: jasmine.createSpy()
      },
      isSelected: false,
      idx: 18,
      expandedRows: [{key: 'one'}, {key: 'two'}],
      extraClasses: 'extra-classes',
      forceUpdate: false,
      subRowDetails: {name: 'subrowname'},
      isRowHovered: false,
      colVisibleStartIdx: 0,
      colVisibleEndIdx: 1,
      colOverscanStartIdx: 2,
      colOverscanEndIdx: 3,
      isScrolling: false
    };

    it('passes classname property', () => {
      const {wrapper} = setup(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.hasClass('react-grid-Row'));
    });
    it('passes style property', () => {
      const {wrapper} = setup(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.props().style).toBeDefined();
    });
    it('passes height property', () => {
      const {wrapper} = setup(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.props().height).toBe(30);
    });
    it('does not pass unknown properties to the div', () => {
      const {wrapper} = setup(allProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.props().columns).toBeUndefined();
      expect(draggableDiv.props().row).toBeUndefined();
      expect(draggableDiv.props().cellRenderer).toBeUndefined();
      expect(draggableDiv.props().cellMetaData).toBeUndefined();
      expect(draggableDiv.props().isSelected).toBeUndefined();
      expect(draggableDiv.props().idx).toBeUndefined();
      expect(draggableDiv.props().expandedRows).toBeUndefined();
      expect(draggableDiv.props().extraClasses).toBeUndefined();
      expect(draggableDiv.props().forceUpdate).toBeUndefined();
      expect(draggableDiv.props().subRowDetails).toBeUndefined();
      expect(draggableDiv.props().isRowHovered).toBeUndefined();
      expect(draggableDiv.props().colVisibleStartIdx).toBeUndefined();
      expect(draggableDiv.props().colVisibleEndIdx).toBeUndefined();
      expect(draggableDiv.props().colOverscanStartIdx).toBeUndefined();
      expect(draggableDiv.props().colOverscanEndIdx).toBeUndefined();
      expect(draggableDiv.props().isScrolling).toBeUndefined();
    });

    describe('Cell rendering', () => {
      describe('When using frozen columns', () => {
        const LAST_LOCKED_CELL_IDX = 5;

        const lockColumns = () => createColumns(COLUMN_COUNT).map((c, idx) => {
          return idx <= LAST_LOCKED_CELL_IDX ? {...c, frozen: true} : c;
        });

        it('should render all frozen and visible and overscan cells', () => {
          const columns = lockColumns(LAST_LOCKED_CELL_IDX);
          const {cells} = setup({...requiredProperties, columns});
          const {colOverscanStartIdx, colOverscanEndIdx} = requiredProperties;
          const renderedRange = colOverscanEndIdx - colOverscanStartIdx + 1;
          expect(cells.length).toBe(renderedRange);
        });

        it('first rendered cell index should be first frozen cell', () => {
          const columns = lockColumns(LAST_LOCKED_CELL_IDX);
          const {cells} = setup({...requiredProperties, columns});
          const firstFrozenColumn = columns.filter(c => c.frozen === true)[0];
          expect(cells.first().props().column).toBe(firstFrozenColumn);
        });
      });

      describe('When not using frozen columns', ()  => {
        it('should render all visible and overscan cells', () => {
          const {cells} = setup(requiredProperties);
          const {colOverscanStartIdx, colOverscanEndIdx} = requiredProperties;
          const renderedRange = colOverscanEndIdx - colOverscanStartIdx + 1;
          expect(cells.length).toBe(renderedRange);
        });

        it('first rendered cell index should be colOverscanStartIdx', () => {
          const {cells} = setup(requiredProperties);
          const {columns, colOverscanStartIdx} = requiredProperties;
          const expectedFirstColumn = columns[colOverscanStartIdx];
          expect(cells.first().props().column).toBe(expectedFirstColumn);
        });

        it('lasat rendered cell index should be colOverscanEndIdx', () => {
          const {cells} = setup(requiredProperties);
          const {columns, colOverscanEndIdx} = requiredProperties;
          const expectedLastColumn = columns[colOverscanEndIdx];
          expect(cells.last().props().column).toBe(expectedLastColumn);
        });
      });
    });
  });
});
