import React from 'react';
import { shallow } from 'enzyme';

import { Position } from '../../common/types';
import CellMask from '../CellMask';
import DragMask, { DraggedPosition } from '../DragMask';

describe('DragMask', () => {
  const setup = (draggedPosition: DraggedPosition) => {
    const props = {
      getSelectedDimensions({ rowIdx }: Position) {
        const heights: { [key: number]: number } = {
          2: 20,
          3: 30,
          4: 40,
          5: 50,
          6: 60
        };
        const height = heights[rowIdx];

        return {
          height,
          width: 50,
          left: 5,
          top: 90,
          zIndex: 1
        };
      },
      draggedPosition
    };

    const wrapper = shallow(<DragMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should not render the CellMask component if the drag handle is on the same row as the dragged cell', () => {
    const mask = setup({ idx: 0, rowIdx: 2, overRowIdx: 2 });

    expect(mask).toHaveLength(0);
  });

  it('should render the CellMask component with correct position for the dragged down cell', () => {
    const mask = setup({ idx: 0, rowIdx: 2, overRowIdx: 4 });

    expect(mask.props()).toMatchObject({
      height: 70,
      width: 50,
      left: 5,
      top: 90
    });
  });

  it('should render the CellMask component with correct position for the dragged up cell', () => {
    const mask = setup({ idx: 0, rowIdx: 6, overRowIdx: 4 });

    expect(mask.props()).toMatchObject({
      height: 90,
      width: 50,
      left: 5,
      top: 90
    });
  });
});
