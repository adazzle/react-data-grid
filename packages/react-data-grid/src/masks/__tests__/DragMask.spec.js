import React from 'react';
import { shallow } from 'enzyme';

import CellMask from '../CellMask';
import DragMask from '../DragMask';
import zIndexes from 'common/constants/zIndexes';

describe('DragMask', () => {
  const setup = (propsOverride = {}) => {
    const props = {
      getSelectedDimensions: ({ rowIdx }) => {
        const { [rowIdx]: height } = {
          2: 20,
          3: 30,
          4: 40,
          5: 50,
          6: 60
        };

        return {
          height,
          width: 50,
          left: 5,
          top: 90
        };
      },
      ...propsOverride
    };

    const wrapper = shallow(<DragMask {...props} />);
    return wrapper.find(CellMask);
  };

  it('should not render the CellMask component if the drag handle is on the same row as the dragged cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 2, overRowIdx: 2 } });

    expect(mask.length).toBe(0);
  });

  it('should render the CellMask component with correct position for the dragged down cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 2, overRowIdx: 4 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 70,
        width: 50,
        left: 5,
        top: 90
      })
    );
  });

  it('should render the CellMask component with correct position for the dragged up cell', () => {
    const mask = setup({ draggedPosition: { idx: 0, rowIdx: 6, overRowIdx: 4 } });

    expect(mask.props()).toEqual(
      jasmine.objectContaining({
        height: 90,
        width: 50,
        left: 5,
        top: 90
      })
    );
  });
});
