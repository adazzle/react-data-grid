import React from 'react';
import CellExpand from '../CellExpand';
import AppConstants from '../AppConstants';
import { mount } from 'enzyme';

describe('CellExpand', () => {
  let testElement;
  let getFakeProps = (expanded) => {
    let expandableOptions = {expanded};
    let onCellExpand = jasmine.createSpy();
    return {
      expandableOptions,
      onCellExpand
    };
  };

  const renderComponent = (props) => {
    const wrapper = mount(<CellExpand {...props} />);
    return wrapper;
  };

  it('should import CellExpand', () => {
    expect(CellExpand).toBeDefined();
  });

  it('should create an instance of CellExpand', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.find(CellExpand).length).toBe(1);
  });

  it('should render correctly when expanded is true', () => {
    let fakeProps = getFakeProps(true);
    testElement = renderComponent(fakeProps);
    expect(testElement.state('expanded')).toBeTruthy();
    expect(testElement.find('span.rdg-cell-expand').text()).toBe(AppConstants.CellExpand.DOWN_TRIANGLE);
  });

  it('should render correctly when expanded is false', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.state('expanded')).toBeFalsy();
    expect(testElement.find('span.rdg-cell-expand').text()).toBe(AppConstants.CellExpand.RIGHT_TRIANGLE);
  });

  it('should call onCellExpand when clicked', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    testElement.simulate('click');
    expect(fakeProps.onCellExpand).toHaveBeenCalled();
    expect(fakeProps.onCellExpand.calls.count()).toEqual(1);
  });

  it('should correctly set state  when clicked', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    testElement.simulate('click');
    expect(testElement.state('expanded')).toBeTruthy();
    testElement.simulate('click');
    expect(testElement.state('expanded')).toBeFalsy();
  });

  it('should correctly set state when receiving data from external source', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    testElement.simulate('click');
    expect(testElement.state('expanded')).toBeTruthy();
    let secondProps = getFakeProps(false);
    testElement.setProps(secondProps);
    expect(testElement.state('expanded')).toBeFalsy();
  });
});
