import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Row from '../Row';
import { shallow } from 'enzyme';
import * as helpers from '../helpers/test/GridPropHelpers';

describe('Row', () => {
  let fakeProps = {
    height: 35,
    columns: [],
    row: [],
    idx: 0
  };

  it('should import Row', () => {
    expect(Row).toBeDefined();
  });

  it('should create an instance of Row', () => {
    let component = TestUtils.renderIntoDocument(<Row {...fakeProps} />);
    expect(component).toBeDefined();
  });

  describe('with extra classes', () => {
    let fakeExtraClasses = ['row-extra-class', 'row-extra-extra-class'];

    it('should have extra classes', () => {
      let newProps = Object.assign({}, fakeProps, {extraClasses: fakeExtraClasses.join(' ')});
      let component = TestUtils.renderIntoDocument(<Row {...newProps} />);

      let row = TestUtils.findRenderedDOMComponentWithClass(component, 'react-grid-Row');
      fakeExtraClasses.forEach((c) => {
        let containsExtraClass = row.className.indexOf(c) > -1;
        expect(containsExtraClass).toBe(true);
      });
    });
  });

  describe('Rendering Row component', () => {
    const renderComponent = (props) => {
      const wrapper = shallow(<Row {...props} />);
      return wrapper;
    };

    const requiredProperties = {
      height: 30,
      columns: helpers.columns,
      row: {key: 'value'},
      idx: 17,
      colVisibleStart: 1,
      colVisibleEnd: 2,
      colDisplayStart: 3,
      colDisplayEnd: 4,
      isScrolling: true
    };

    const allProperties = {
      height: 35,
      columns: helpers.columns,
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
      colVisibleStart: 0,
      colVisibleEnd: 1,
      colDisplayStart: 2,
      colDisplayEnd: 3,
      isScrolling: false
    };

    it('passes classname property', () => {
      const wrapper = renderComponent(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.hasClass('react-grid-Row'));
    });
    it('passes style property', () => {
      const wrapper = renderComponent(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.props().style).toBeDefined();
    });
    it('passes onDragEnter property', () => {
      const wrapper = renderComponent(requiredProperties);
      const draggableDiv = wrapper.find('div');
      expect(draggableDiv.props().onDragEnter).toBeDefined();
    });
    it('passes height property', () => {
      const wrapper = renderComponent(requiredProperties);
      const draggableDiv = wrapper.find('div').at(0);
      expect(draggableDiv.props().height).toBe(30);
    });
    it('does not pass unknown properties to the div', () => {
      const wrapper = renderComponent(allProperties);
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
      expect(draggableDiv.props().colVisibleStart).toBeUndefined();
      expect(draggableDiv.props().colVisibleEnd).toBeUndefined();
      expect(draggableDiv.props().colDisplayStart).toBeUndefined();
      expect(draggableDiv.props().colDisplayEnd).toBeUndefined();
      expect(draggableDiv.props().isScrolling).toBeUndefined();
    });
  });
});
