import React from 'react';
import { shallow } from 'enzyme';

import DraggableContainer from '../DraggableContainer';
import ReactDataGrid from 'react-data-grid';

describe('<DraggableContainer />', () => {
  it('should render grid wrapper to be used as Drag and Drop context with grid as a child component inside', () => {
    const wrapper = shallow(<DraggableContainer />);
    expect(wrapper.find(ReactDataGrid));
  });
});
