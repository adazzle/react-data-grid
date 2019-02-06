import React from 'react';
import { shallow } from 'enzyme';

import DraggableContainer from '../DraggableContainer';
import DraggableHeaderCell from '../DraggableHeaderCell';

const HeaderCell = () => <div/>;

describe('<DraggableHeaderCell />', () => {
  it('should render grid HeaderCell wrapper with cursor: move ', () => {
    const wrapper = shallow(
      <DraggableContainer>
        <DraggableHeaderCell renderHeaderCell={() => <HeaderCell/>}/>
      </DraggableContainer>
    );
    expect(wrapper.find(HeaderCell));
  });
});
