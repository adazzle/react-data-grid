import React from 'react';
import CellExpand from '../CellExpand';
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
    expect(testElement.find('span.rdg-cell-expand').text()).toBe(String.fromCharCode('9660'));
  });

  it('should render correctly when expanded is false', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.state('expanded')).toBeFalsy();
    expect(testElement.find('span.rdg-cell-expand').text()).toBe(String.fromCharCode('9654'));
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
});
