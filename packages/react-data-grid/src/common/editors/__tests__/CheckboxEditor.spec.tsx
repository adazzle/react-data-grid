import React from 'react';
import { mount } from 'enzyme';
import CheckboxEditor from '../CheckboxEditor';
import { CalculatedColumn } from '../../types';

describe('CheckboxEditor', () => {
  function setup(value = true) {
    const testColumn: CalculatedColumn = {
      idx: 0,
      name: 'columnKey',
      key: 'columnKey',
      width: 100,
      left: 0
    };

    return mount(
      <CheckboxEditor
        value={value}
        rowIdx={1}
        column={testColumn}
        dependentValues={{}}
      />
    );
  }

  it('should be selected if value prop is true', () => {
    const wrapper = setup();
    expect(wrapper.find('input').prop('checked')).toBe(true);
  });

  it('should not be selected if value prop is false', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });
});
