

import React from 'react';
import { shallow } from 'enzyme';
import AutoCompleteEditor from '../AutoCompleteEditor';
import ReactAutocomplete from 'ron-react-autocomplete';

describe('AutoCompleteEditor', () => {
  function fakeCb() { return true; }
  const fakeOptions = [{ id: 1, title: 'test-result1' }, { id: 2, title: 'test-result2' }];
  const fakeParams = ['param1', 'param2', 'param3'];
  const fakeColumn = { key: 'autocomplete', name: 'name', width: 0 };

  describe('Unit Tests', () => {
    describe('Basic tests', () => {
      function setup() {
        const wrapper = shallow(<AutoCompleteEditor
          onCommit={fakeCb}
          options={fakeOptions}
          label="title"
          value="value"
          valueParams={fakeParams}
          column={fakeColumn}
          resultIdentifier="id"
          search="test"
          height={30}
          onKeyDown={fakeCb}/>);
        const autocomplete = wrapper.find(ReactAutocomplete);
        return { wrapper, autocomplete };
      }

      it('should pass the search text to ReactAutocomplete as a prop', () => {
        const { autocomplete } = setup();
        expect(autocomplete.props().search).toBe('test');
      });

      it('should pass the label to ReactAutocomplete as a prop', () => {
        const { autocomplete } = setup();
        expect(autocomplete.props().label).toBe('title');
      });

      it('should pass the resultIdentifier to ReactAutocomplete as a prop', () => {
        const { autocomplete } = setup();
        expect(autocomplete.props().resultIdentifier).toBe('id');
      });

      it('should pass the options to ReachAutocomplete as a prop', () => {
        const { autocomplete } = setup();
        expect(autocomplete.props().options).toBe(fakeOptions);
      });

      it('should pass the value to ReachAutocomplete as a prop', () => {
        const { autocomplete } = setup();
        expect(autocomplete.props().value.title).toBe('value');
      });

      it('should construct values from the parameters', () => {
        const { wrapper } = setup();
        const constructedValues = wrapper.instance().constuctValueFromParams({ param1: 'value1', param2: 'value2' }, fakeParams);
        expect(constructedValues).toBe('value1|value2|');
      });

      it('should return the value for getLabel if item is a string', () => {
        const { wrapper } = setup();
        const value = wrapper.instance().getLabel({ title: 'autocomplete' });
        expect(value).toBe('autocomplete');
      });
    });
  });
});
