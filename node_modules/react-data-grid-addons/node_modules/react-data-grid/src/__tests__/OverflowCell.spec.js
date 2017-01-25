import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import OverflowCell, { OverflowCellComponent } from '../OverflowCell';
import FocusableComponentTestRunner from './FocusableComponentTestRunner';

const renderOverflowCell = p => mount(<OverflowCell {...p} />);
const DEFAULT_COLUMN = { width: 50, left: 100 };
const DEFAULT_PROPS = { column: DEFAULT_COLUMN, height: 60 };

const createSelectedCell = () => {
  let rowIdx = 0;
  let idx = 0;
  let selected = { rowIdx, idx };

  return { cellMetaData: { selected, isScrollingHorizontallyWithKeyboard: false }, rowIdx, idx };
};

describe('OverflowCell', () => {
  let overflowCellElementWrapper;

  describe('render tests', () => {
    beforeEach(() => {
      overflowCellElementWrapper = renderOverflowCell(DEFAULT_PROPS);
    });

    it('should render without crashing', () => {
      expect(overflowCellElementWrapper.node).toBeDefined();
    });

    it('render with the correct style based on props', () => {
      let domNode = ReactDOM.findDOMNode(overflowCellElementWrapper.component);

      const { width, height, left } = domNode.style;

      expect(parseInt(width, 10)).toBe(DEFAULT_COLUMN.width);
      expect(parseInt(left, 10)).toBe(DEFAULT_COLUMN.left);
      expect(parseInt(height, 10)).toBe(DEFAULT_PROPS.height);
    });
  });

  describe('isSelected', () => {
    it('should return true when the current row and column are selected', () => {
      let isSelected = OverflowCellComponent.isSelected(createSelectedCell());

      expect(isSelected).toBeTruthy();
    });

    it('should return false when the current row is not selected', () => {
      let props = createSelectedCell();
      props.rowIdx++;

      let isSelected = OverflowCellComponent.isSelected(props);

      expect(isSelected).toBeFalsy();
    });

    it('should return false when the current column is not selected', () => {
      let props = createSelectedCell();
      props.idx++;

      let isSelected = OverflowCellComponent.isSelected(props);

      expect(isSelected).toBeFalsy();
    });
  });

  const initalSelectedCell = createSelectedCell();

  new FocusableComponentTestRunner({
    Component: OverflowCell,
    props: Object.assign({ }, DEFAULT_PROPS, initalSelectedCell),
    getNewSelection: ({ rowIdx, idx }) => {
      return { rowIdx, idx: idx + 1 };
    }
  }).run();
});
