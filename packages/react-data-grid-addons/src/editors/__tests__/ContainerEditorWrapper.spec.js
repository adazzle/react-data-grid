import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

import ContainerEditorWrapper from '../ContainerEditorWrapper';

class FakeComponent extends React.Component {
    getValue = jest.fn()
    getInputNode = jest.fn()
    render() { return <div />; }
}

class FakeContainer extends React.Component {
  render() { return <FakeComponent ref={this.props.refCallback} />; }
}

FakeContainer.propTypes = {
  refCallback: PropTypes.func.isRequired
};

describe('ContainerEditorWrapper', () => {
  describe('Basic tests', () => {
    it('should create a new ContainerEditorWrapper instance wrapping the passed in component', () => {
      // ACT
      const ConnectedContainerEditorWrapper = ContainerEditorWrapper(FakeContainer);
      const renderedComp = mount(<ConnectedContainerEditorWrapper />);

      // ASSERT
      expect(renderedComp.find(FakeContainer).length).toBe(1);
      expect(renderedComp.find(FakeComponent).length).toBe(1);
    });
  });
});
