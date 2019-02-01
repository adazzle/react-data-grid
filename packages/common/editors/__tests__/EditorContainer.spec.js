
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

const EditorContainer = require('../EditorContainer');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase = require('../EditorBase');

function DefaultEditor() {
  return (
    <div>
      <input type="text" id="input1" />
      <div>
        <input type="text" id="input2" />
        <button
          type="button"
          id="button1"
          onClick={e => e.stopPropagation()}
        />
        <button
          type="button"
          id="button2"
          onClickCapture={e => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

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
    let props;
    let wrapper;

    class TestEditor extends EditorBase {
      render() {
        return <DefaultEditor />;
      }
    }

    beforeEach(() => {
      ({ wrapper, props } = setup({
        value: 'SupernaviX',
        column: { ...fakeColumn, editor: <TestEditor /> }
      }));
    });

    it('should render element custom editors', () => {
      const editor = wrapper.find(TestEditor);

      expect(editor.length).toBe(1);
      expect(editor.props().value).toBe('SupernaviX');
      expect(editor.props().onCommit).toBeDefined();
      expect(editor.props().onCommitCancel).toBeDefined();
    });

    it('should not commit if any element inside the editor is clicked', () => {
      wrapper.find('#input1').simulate('click');
      wrapper.find('#input2').simulate('click');

      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should not commit if any element inside the editor is clicked that stops the event propagation', () => {
      wrapper.find('#button1').simulate('click');
      wrapper.find('#button2').simulate('click');

      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should call onCommitCancel when editor cancels editing', () => {
      const editor = wrapper.find(TestEditor);

      editor.props().onCommitCancel();

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

  describe('Custom Portal editors', () => {
    let container;
    let wrapper;
    let props;

    class PortalTestEditor extends EditorBase {
      render() {
        return ReactDOM.createPortal(<DefaultEditor />, document.body);
      }
    }

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ({ wrapper, props } = setup({ column: { ...fakeColumn, editor: <PortalTestEditor /> } }, { attachTo: container }));
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should not commit if any element inside the editor is clicked', () => {
      const editor = wrapper.find(PortalTestEditor);
      editor.find('#input1').simulate('click');
      editor.find('#input2').simulate('click');

      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should not commit if any element inside the editor is clicked that stops the event propagation', () => {
      const editor = wrapper.find(PortalTestEditor);
      wrapper.find('#button1').simulate('click');
      wrapper.find('#button2').simulate('click');


      expect(props.onCommit.calls.count()).toEqual(0);
    });

    it('should commit if any element outside the editor is clicked', () => {
      document.body.click();
      expect(props.onCommit).toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    let container;
    let wrapper;
    let props;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ({ wrapper, props } = setup({}, { attachTo: container }));
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('hitting enter should call commit only once', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Enter' });

      expect(props.onCommit.calls.count()).toEqual(1);
    });

    it('hitting tab should call commit only once', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Tab' });

      expect(props.onCommit.calls.count()).toEqual(1);
    });

    it('hitting escape should call commitCancel only once', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Escape' });

      expect(props.onCommitCancel.calls.count()).toEqual(1);
    });

    it('hitting escape should not call commit changes on componentWillUnmount', () => {
      const editor = wrapper.find(SimpleTextEditor);
      editor.simulate('keydown', { key: 'Escape' });
      wrapper.unmount();

      expect(props.onCommit).not.toHaveBeenCalled();
    });

    it('should commit if any element outside the editor is clicked', () => {
      document.body.click();
      expect(props.onCommit).toHaveBeenCalled();
    });
  });
});
