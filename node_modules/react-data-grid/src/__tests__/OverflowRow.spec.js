import React from 'react';
import { mount } from 'enzyme';
import OverflowRow, { OverflowRowComponent } from '../OverflowRow';
import FocusableComponentTestRunner from './FocusableComponentTestRunner';

const createSelectedCell = () => {
  let rowIdx = 0;
  let idx = 0;
  let selected = { rowIdx, idx };

  return { cellMetaData: { selected, isScrollingVerticallyWithKeyboard: false }, rowIdx, idx };
};

describe('OverflowRow', () => {
  describe('render tests', () => {
    it('should render without crashing', () => {
      const overflowCellElementWrapper = mount(<OverflowRow />);
      expect(overflowCellElementWrapper.node).toBeDefined();
    });
  });

  describe('isSelected', () => {
    it('should return true when the current row and column are selected', () => {
      let isSelected = OverflowRowComponent.isSelected(createSelectedCell());

      expect(isSelected).toBeTruthy();
    });

    it('should return false when the current row is not selected', () => {
      let props = createSelectedCell();
      props.idx++;

      let isSelected = OverflowRowComponent.isSelected(props);

      expect(isSelected).toBeFalsy();
    });
  });

  const initalSelectedCell = createSelectedCell();

  new FocusableComponentTestRunner({
    Component: OverflowRow,
    props: initalSelectedCell,
    getNewSelection: ({ rowIdx, idx }) => {
      return { rowIdx: rowIdx + 1, idx };
    }
  }).run();
});
