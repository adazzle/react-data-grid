
import React from 'react';
import { mount } from 'enzyme';

const EditorContainer = require('../EditorContainer.js');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase = require('../EditorBase');
import EditorPortal from '../EditorPortal';

const fakeColumn = {
  name: 'col1',
  key: 'col1',
  width: 100
};

const setup = (extraProps, container) => {
  const props = {
    rowData: {
      col1: 'I',
      col2: 'love',
      col3: 'Testing'
    },
    column: fakeColumn,
    value: 'Adwolf',
    height: 50,
    onCommit: jasmine.createSpy(),
    onCommitCancel: jasmine.createSpy(),
    ...extraProps
  };
  const wrapper = mount(<EditorContainer {...props} />, container);

  return { wrapper, props };
};

describe('Editor Container Tests', () => {
  describe('Basic render tests', () => {
    it('should select the text of the default input when the editor is rendered', () => {
      const { wrapper } = setup();
      const isTextSelected = (input) => {
        if (typeof input.selectionStart === 'number') {
          return input.selectionStart === 0 && input.selectionEnd === input.value.length;
        } else if (typeof document.selection !== 'undefined') {
          input.focus();
          return document.selection.createRange().text === input.value;
        }
      };
      const editorNode = wrapper.instance().getInputNode();

      expect(isTextSelected(editorNode)).toBeDefined();
    });

    it('should render the editor with the correct properties', () => {
      const { wrapper } = setup();
      const editor = wrapper.find(SimpleTextEditor);

      expect(editor.length).toBe(1);
      expect(editor.props().value).toEqual('Adwolf');
      expect(editor.props().column).toEqual(fakeColumn);
    });

    it('should render the editor container div with correct properties', () => {
      const { wrapper } = setup();
      const editorDiv = wrapper.find('div').at(0);

      expect(editorDiv.props().className).toBeDefined();
      expect(editorDiv.props().onKeyDown).toBeDefined();
      expect(editorDiv.props().children).toBeDefined();
    });
  });

  describe('Custom Editors', () => {
    class TestEditor extends EditorBase {
      render() {
        return (
          <div>
            <input type="text" id="testpassed" />
            <div>
              <input type="text" id="input2" />
              <button id="test-button" />
            </div>
          </div>
        );
      }
    }

    let props;
    let wrapper;

    beforeEach(() => {
      ({ wrapper, props } = setup({
        value: 'SupernaviX',
        column: { ...fakeColumn, editor: <TestEditor /> }
      }));
    });

    it('should render element custom editors', () => {
      const editor = wrapper.find(TestEditor);

      expect(editor.length).toBe(1);
      expect(editor.props().value).toBeDefined();
      expect(editor.props().onCommit).toBeDefined();
      expect(editor.props().onCommitCancel).toBeDefined();
    });

    it('should render component custom editors', () => {
      wrapper.setProps({ column: { ...fakeColumn, editor: TestEditor } });
      const editor = wrapper.find(TestEditor);

      expect(editor.length).toBe(1);
      expect(editor.props().value).toBeDefined();
      expect(editor.props().onCommit).toBeDefined();
    });

    it('should not commit if any element inside the editor is clicked', () => {
      const editor = wrapper.find(TestEditor);
      editor.simulate('click');

      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should call onCommitCancel when editor cancels editing', () => {
      const editor = wrapper.find(TestEditor);

      editor.props().onCommitCancel();

      expect(props.onCommitCancel).toHaveBeenCalled();
      expect(props.onCommitCancel.calls.count()).toEqual(1);
      expect(props.onCommit).not.toHaveBeenCalled();
    });

    it('should not commit changes on componentWillUnmount if editor cancels editing', () => {
      const editor = wrapper.find(TestEditor);

      editor.props().onCommitCancel();
      wrapper.unmount();

      expect(props.onCommit).not.toHaveBeenCalled();
    });
  });

  describe('Portal editors', () => {
    let container;
    let wrapper;
    let props;

    class TestEditor extends EditorBase {
      render() {
        return (
          <EditorPortal>
            <div>
              <input type="text" id="testpassed" />
              <div>
                <input type="text" id="input2" />
                <button id="test-button" />
              </div>
            </div>
          </EditorPortal>
        );
      }
    }

    beforeEach(() => {
      container = document.createElement('div');
      container.className = 'container';
      document.body.appendChild(container);
      ({ wrapper, props } = setup({ column: { ...fakeColumn, editor: <TestEditor /> } }, { attachTo: container }));
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should not commit if any element inside the editor is clicked', () => {
      const editor = wrapper.find(TestEditor);
      editor.simulate('click');

      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should commit if any element outside the editor is clicked', () => {
      document.querySelector('.container').click();

      expect(props.onCommit).toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    let container;
    let wrapper;
    let props;

    beforeEach(() => {
      container = document.createElement('div');
      container.className = 'container';
      document.body.appendChild(container);
      ({ wrapper, props } = setup({}, { attachTo: container }));
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('hitting enter should call commit only once', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Enter' });

      expect(props.onCommit).toHaveBeenCalled();
      expect(props.onCommit.calls.count()).toEqual(1);
    });

    it('hitting escape should call commitCancel only once', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Escape' });

      expect(props.onCommitCancel).toHaveBeenCalled();
      expect(props.onCommitCancel.calls.count()).toEqual(1);
    });

    it('hitting escape should not call commit changes on componentWillUnmount', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Escape' });

      expect(props.onCommit).not.toHaveBeenCalled();
    });

    it('should commit if any element outside the editor is clicked', () => {
      document.querySelector('.container').click();

      expect(props.onCommit).toHaveBeenCalled();
    });
  });
});
