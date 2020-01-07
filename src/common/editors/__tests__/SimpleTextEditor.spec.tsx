import React from 'react';
import { mount } from 'enzyme';
import SimpleTextEditor from '../SimpleTextEditor';
import { ValueFormatter } from '../../../formatters';
import { CalculatedColumn } from '../../types';

interface Row { text: string }

describe('SimpleTextEditor', () => {
  describe('Basic tests', () => {
    const fakeColumn: CalculatedColumn<Row, 'text'> = {
      idx: 0,
      key: 'text',
      name: 'name',
      width: 0,
      left: 0,
      formatter: ValueFormatter
    };
    const fakeBlurCb = jest.fn();

    function setup() {
      return mount<SimpleTextEditor>(
        <SimpleTextEditor
          value="This is a test"
          onCommit={fakeBlurCb}
          column={fakeColumn}
        />
      );
    }

    it('should pass the onBlur fuction down to the input as a prop', () => {
      setup().find('input').simulate('blur');
      expect(fakeBlurCb).toHaveBeenCalled();
    });

    it('should return the value when getValue is called', () => {
      expect(setup().instance().getValue().text).toBe('This is a test');
    });
  });
});
