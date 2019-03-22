import React from 'react';
import { mount } from 'enzyme';

import ChildRowDeleteButton from '../ChildRowDeleteButton';

describe('ChildRowDeleteButton', () => {
  let testElement;
  const getFakeProps = (isLastSibling) => {
    const onDeleteSubRow = jest.fn();
    const siblingIndex = isLastSibling ? 1 : 0;
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
    const fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.find(ChildRowDeleteButton).length).toBe(1);
  });

  it('should render correctly when is isLastSibiling is false', () => {
    const fakeProps = getFakeProps(false);
    testElement = renderComponent(fakeProps);
    expect(testElement.find('div.rdg-child-row-action-cross').length).toBe(1);
    expect(testElement.find('div.rdg-child-row-btn').length).toBe(1);
  });

  it('should render correctly when is isLastSibiling is true', () => {
    const fakeProps = getFakeProps(true);
    testElement = renderComponent(fakeProps);
    expect(testElement.find('div.rdg-child-row-action-cross').length).toBe(1);
    expect(testElement.find('div.rdg-child-row-btn').length).toBe(1);
  });

  it('should call onDeleteSubRow when clicked', () => {
    const fakeProps = getFakeProps(true);
    testElement = renderComponent(fakeProps);
    const button = testElement.find('div.rdg-child-row-btn');
    button.simulate('click');
    expect(fakeProps.onDeleteSubRow).toHaveBeenCalled();
    expect(fakeProps.onDeleteSubRow.mock.calls.length).toEqual(1);
  });
});
