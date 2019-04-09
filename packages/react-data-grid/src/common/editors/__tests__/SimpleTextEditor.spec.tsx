import React from 'react';
import { mount } from 'enzyme';
import SimpleTextEditor from '../SimpleTextEditor';
import { Column } from '../../types';

describe('SimpleTextEditor', () => {
  describe('Basic tests', () => {
    const fakeColumn: Column = {
      key: 'text',
      name: 'name',
      width: 0,
      filterable: false,
      onCellChange() {}
    };
    function fakeBlurCb() { return true; }

    function setup() {
      return mount<SimpleTextEditor>(
        <SimpleTextEditor
          value="This is a test"
          onBlur={fakeBlurCb}
          column={fakeColumn}
        />
      );
    }

    it('should pass the onBlur fuction down to the input as a prop', () => {
      expect(setup().prop('onBlur')).toBe(fakeBlurCb);
    });

    it('should return the value when getValue is called', () => {
      expect(setup().instance().getValue().text).toBe('This is a test');
    });
  });
});
