import React from 'react';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { mount } from 'enzyme';

describe('ChildRowDeleteButton', () => {
  let testElement;
  let getFakeProps = (isLastSibling) => {
    let onDeleteSubRow = jasmine.createSpy();
    let siblingIndex = isLastSibling ? 1 : 0;
    return {
      treeDepth: 2,
      cellHeight: 50,
      siblingIndex,
      numberSiblings: 2,
      onDeleteSubRow,
      isDeleteSubRowEnabled: true
    };
  };

  const renderComponent = (props) => {
    const wrapper = mount(<ChildRowDeleteButton {...props} />);
    return wrapper;
  };

  beforeEach(() => {
    testElement = renderComponent(getFakeProps());
  });

  it('should import CellExpand', () => {
    expect(ChildRowDeleteButton).toBeDefined();
  });

  it('should create an instance of CellExpand', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.find(ChildRowDeleteButton).length).toBe(1);
  });

  it('should render correctly when is isLastSibiling is false', () => {
    let fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.find('div.rdg-child-row-action-cross').length).toBe(1);
    expect(testElement.find('div.rdg-child-row-btn').length).toBe(1);
  });

  it('should render correctly when is isLastSibiling is true', () => {
    let fakeProps = getFakeProps(true);
    testElement = renderComponent(fakeProps);
    expect(testElement.find('div.rdg-child-row-action-cross').length).toBe(1);
    expect(testElement.find('div.rdg-child-row-btn').length).toBe(1);
  });

  it('should call onDeleteSubRow when clicked', () => {
    let fakeProps = getFakeProps(true);
    testElement = renderComponent(fakeProps);
    let button = testElement.find('div.rdg-child-row-btn');
    button.simulate('click');
    expect(fakeProps.onDeleteSubRow).toHaveBeenCalled();
    expect(fakeProps.onDeleteSubRow.calls.count()).toEqual(1);
  });
});
