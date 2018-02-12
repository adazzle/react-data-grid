import React from 'react';
import TestUtils from 'react-dom/test-utils';
import MenuHeader from '../MenuHeader';

describe('Context Menu Header', () => {
  let contextMenuHeader = {};

  beforeEach(() => {
    contextMenuHeader = TestUtils.renderIntoDocument(<MenuHeader />);
  });

  it('should create an instance of MenuHeader', () => {
    expect(contextMenuHeader).toBeDefined();
  });

  it('should have class "react-context-menu-header"', () => {
    let header = TestUtils.findRenderedDOMComponentWithClass(contextMenuHeader, 'react-context-menu-header');
    expect(header).toBeDefined();
  });
});
