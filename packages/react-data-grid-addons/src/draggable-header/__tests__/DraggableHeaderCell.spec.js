import React from 'react';
import { shallow } from 'enzyme';

import DraggableContainer from '../DraggableContainer';
import DraggableHeaderCell from '../DraggableHeaderCell';
import { HeaderCell } from 'react-data-grid';

describe('<DraggableHeaderCell />', () => {
  it('should render grid HeaderCell wrapper with cursor: move ', () => {
    const wrapper = shallow(
      <DraggableContainer>
        <DraggableHeaderCell />
      </DraggableContainer>
    );
    expect(wrapper.find(HeaderCell));
  });
});
