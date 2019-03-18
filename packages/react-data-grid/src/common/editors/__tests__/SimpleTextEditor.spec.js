import React from 'react';
import { mount } from 'enzyme';

import SimpleTextEditor from '../SimpleTextEditor';

describe('SimpleTextEditor', () => {
  describe('Basic tests', () => {
    let component;

    const fakeColumn = { key: 'text', name: 'name', width: 0 };
    function fakeBlurCb() { return true; }
    function fakeFunction() { }
    beforeEach(() => {
      component = mount(
        <SimpleTextEditor
          value="This is a test"
          onBlur={fakeBlurCb}
          onKeyDown={fakeFunction}
          commit={fakeFunction}
          column={fakeColumn}
        />
      ).instance();
    });

    it('should create a new SimpleTextEditor instance', () => {
      expect(component).toBeDefined();
    });

    it('should pass the onBlur fuction down to the input as a prop', () => {
      expect(component.props.onBlur()).toBe(true);
    });

    it('should return the value when getValue is called', () => {
      expect(component.getValue().text).toBe('This is a test');
    });
  });
});
