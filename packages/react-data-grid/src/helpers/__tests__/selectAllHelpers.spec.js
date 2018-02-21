import { mount } from 'enzyme';
import React from 'react';
import {
    addIndeterminate,
    indeterminateClassName,
    removeIndeterminate,
    populateSelectAllChecked,
    populateIndeterminate
} from '../selectAllHelpers';

const CheckboxInput = () => <input type="checkbox" id="test_checkbox" />;
const CheckboxLabel = () => <label id="test_checkbox_label" />;

describe('selectAllHelpers test', () => {
  describe('select all checkbox tests', () => {
    it('should populate select all as checked', () => {
      const wrapper = mount(<CheckboxInput />);
      wrapper.getDOMNode().checked = false;
      populateSelectAllChecked(wrapper.getDOMNode(), 10, 10);
      expect(wrapper.getDOMNode().checked).toBeTruthy();
    });

    it('should populate select all as unchecked for empty selection', () => {
      const wrapper = mount(<CheckboxInput />);
      wrapper.getDOMNode().checked = true;
      populateSelectAllChecked(wrapper.getDOMNode(), 10, 0);
      expect(wrapper.getDOMNode().checked).toBeFalsy();
    });

    it('should populate select all as unchecked for indeterminate selection', () => {
      const wrapper = mount(<CheckboxInput />);
      wrapper.getDOMNode().checked = true;
      populateSelectAllChecked(wrapper.getDOMNode(), 10, 5);
      expect(wrapper.getDOMNode().checked).toBeFalsy();
    });

    it('should not select all if rowsCount is 0', () => {
      const wrapper = mount(<CheckboxInput />);
      wrapper.getDOMNode().checked = false;
      populateSelectAllChecked(wrapper.getDOMNode(), 0, 0);
      expect(wrapper.getDOMNode().checked).toBeFalsy();
    });
  });

  describe('indeterminate tests', () => {
    describe('addIndeterminate() removeIndeterminate() tests', () => {
      it('should add indeterminate class', () => {
        const wrapper = mount(<CheckboxLabel />);
        const { classList } = wrapper.getDOMNode();
        addIndeterminate(classList);
        expect(classList.contains(indeterminateClassName)).toBeTruthy();
      });

      it('should remove indeterminate class', () => {
        const wrapper = mount(<CheckboxLabel />);
        const { classList } = wrapper.getDOMNode();
        addIndeterminate(classList);
        removeIndeterminate(classList);
        expect(classList.contains(indeterminateClassName)).toBeFalsy();
      });
    });

    describe('populateIndeterminate tests', () => {
      it('should not add indeterminate class if enableIndeterminate === false', () => {
        const wrapper = mount(<CheckboxLabel />);
        addIndeterminate(wrapper.getDOMNode().classList); // simulate enableIndeterminate is changed outside of RDG
        populateIndeterminate(wrapper.getDOMNode(), 5, 3, false);
        expect(wrapper.getDOMNode().classList.contains(indeterminateClassName)).toBeFalsy();
      });

      it('should add indeterminate class if selectedRowCounts is between 0 and rowsCount', () => {
        const wrapper = mount(<CheckboxLabel />);
        populateIndeterminate(wrapper.getDOMNode(), 5, 3, true);
        expect(wrapper.getDOMNode().classList.contains(indeterminateClassName)).toBeTruthy();
      });

      it('should remove indeterminate class if selectedRowCounts is between 0 or rowsCount', () => {
        const wrapper = mount(<CheckboxLabel />);
        addIndeterminate(wrapper.getDOMNode().classList);
        populateIndeterminate(wrapper.getDOMNode(), 5, 5, true);
        expect(wrapper.getDOMNode().classList.contains(indeterminateClassName)).toBeFalsy();

        addIndeterminate(wrapper.getDOMNode().classList);
        populateIndeterminate(wrapper.getDOMNode(), 5, 0, true);
        expect(wrapper.getDOMNode().classList.contains(indeterminateClassName)).toBeFalsy();
      });
    });
  });
});
