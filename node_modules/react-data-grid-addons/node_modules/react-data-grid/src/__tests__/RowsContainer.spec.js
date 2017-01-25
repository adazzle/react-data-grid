import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import RowsContainer from '../RowsContainer';

describe('Rows Container', () => {
  describe('without context menu', () => {
    let componentWithoutContextMenu = {};

    beforeEach(() => {
      componentWithoutContextMenu = ReactTestUtils.renderIntoDocument(<RowsContainer window={{ ReactDataGridPlugins: undefined }} />);
    });

    it('should create a new RowsContainer instance', () => {
      expect(componentWithoutContextMenu).toBeDefined();
    });
  });
});
