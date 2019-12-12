import React from 'react';
import { mount } from 'enzyme';
import SimpleTextEditor from '../SimpleTextEditor';
import { valueCellContentRenderer } from '../../../Cell/cellContentRenderers';
import { CalculatedColumn } from '../../types';

interface Row { text: string }

describe('SimpleTextEditor', () => {
  describe('Basic tests', () => {
    const fakeColumn: CalculatedColumn<Row, unknown, 'text'> = {
      idx: 0,
      key: 'text',
      name: 'name',
      width: 0,
      left: 0,
      cellContentRenderer: valueCellContentRenderer
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
