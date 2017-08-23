import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDataGridContextMenu from '../ContextMenu';
import {ContextMenu} from 'react-contextmenu';

describe('Context Menu Multiple', () => {
  let component = {};
  const menuId = 'uniqueMenuId';

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<ReactDataGridContextMenu contextMenuId={menuId}/>);
  });

  it('should create a new ContextMenu instance', () => {
    expect(component).toBeDefined();
  });

  it('should have contextMenuId prop as identifier', () => {
    let contextMenu = TestUtils.findRenderedComponentWithType(component, ContextMenu);
    expect(contextMenu.props.identifier).toEqual(menuId);
  });
});
