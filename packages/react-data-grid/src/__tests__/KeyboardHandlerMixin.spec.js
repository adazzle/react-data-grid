import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import KeyboardHandlerMixin from '../KeyboardHandlerMixin';


let TestComponent = React.createClass({
  mixins: [KeyboardHandlerMixin],
  render: function() {
    return (
      <div tabIndex="0" onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} />
    );
  }
});

describe('KeyboardHandlerMixin', () => {
  it('renders', () => {
    let component = TestUtils.renderIntoDocument(<TestComponent/>);
    expect(component).toBeDefined();
  });

  it('registers keyDown events', () => {
    let component = TestUtils.renderIntoDocument(<TestComponent/>);
    const node = ReactDOM.findDOMNode(component);
    TestUtils.Simulate.keyDown(node, {key: 'Enter', keyCode: 13, which: 13});

    expect(component.isKeyDown(13)).toBeTruthy();
  });

  it('registers keyUp events', () => {
    let component = TestUtils.renderIntoDocument(<TestComponent/>);
    const node = ReactDOM.findDOMNode(component);
    TestUtils.Simulate.keyDown(node, {key: 'Enter', keyCode: 13, which: 13});
    TestUtils.Simulate.keyUp(node, {key: 'Enter', keyCode: 13, which: 13});

    expect(component.isKeyDown(13)).toBeFalsy();
  });
});
