import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ReactDataGridContextMenu from '../ContextMenu';
import {ContextMenu} from 'react-contextmenu';

describe('Context Menu', () => {
  let component = {};

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<ReactDataGridContextMenu />);
  });

  it('should create a new ContextMenu instance', () => {
    expect(component).toBeDefined();
  });

  it('should have "reactDataGridContextMenu" as identifier', () => {
    let contextMenu = TestUtils.findRenderedComponentWithType(component, ContextMenu);
    expect(contextMenu.props.identifier).toEqual('reactDataGridContextMenu');
  });
});
