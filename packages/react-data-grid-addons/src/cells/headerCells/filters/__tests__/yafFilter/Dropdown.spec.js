import React from 'react';
import { shallow } from 'enzyme';
import Dropdown, {
  DropdownToggle,
  DropdownBody,
  DropdownHeader
} from '../../yafFilter/Dropdown';

describe('Dropdown', () => {
  it('toggles the dropdown', () => {
    const wrapper = shallow(
      <Dropdown>
        <DropdownToggle/>
        <DropdownBody />
      </Dropdown>
    );
    expect(wrapper.state().isOpen).toBe(false);
    wrapper.instance().toggle();
    expect(wrapper.state().isOpen).toBe(true);
    wrapper.instance().toggle();
    expect(wrapper.state().isOpen).toBe(false);
  });

  describe('DropdownToggle', () => {
    it('automatically toggles the dropdown', () => {
      let wrapper = shallow(
        <Dropdown>
          <DropdownToggle/>
          <DropdownBody />
        </Dropdown>
      );
      wrapper.find(DropdownToggle).simulate('click');
      expect(wrapper.state().isOpen).toBe(true);
    });
  });

  describe('DropdownToggle', () => {
    it('automatically toggles the dropdown', () => {
      let wrapper = shallow(
        <Dropdown>
          <DropdownToggle/>
          <DropdownBody />
        </Dropdown>
      );
      wrapper.find(DropdownToggle).simulate('click');
      expect(wrapper.state().isOpen).toBe(true);
    });
  });

  describe('DropdownHeader', () => {
    it('closes the dropdown', () => {
      let wrapper = shallow(
        <Dropdown target=".dropdown">
          <DropdownToggle/>
          <DropdownHeader/>
          <DropdownBody />
        </Dropdown>
      );
      wrapper.instance().toggle();
      expect(wrapper.state().isOpen).toBe(true);
      wrapper.instance().close();
      expect(wrapper.state().isOpen).toBe(false);
    });
  });
});
