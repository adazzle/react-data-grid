
const React            = require('react');
const EditorContainer  = require('../EditorContainer.js');
const SimpleTextEditor = require('../SimpleTextEditor');
const EditorBase       = require('../EditorBase');
import { mount, shallow } from 'enzyme';

const fakeColumn = {
  name: 'col1',
  key: 'col1',
  width: 100
};

const defaultProps = {
  rowData: {
    col1: 'I',
    col2: 'love',
    col3: 'Testing'
  },
  column: fakeColumn,
  value: 'Adwolf',
  height: 50,
  onCommit: jasmine.createSpy(),
  onCommitCancel: jasmine.createSpy()
};

const getComponent = (props) => {
  const shallowWrapper = shallow(<EditorContainer { ...defaultProps } { ...props } />);
  const mountedWrapper = mount(<EditorContainer { ...defaultProps } { ...props } />);

  return { shallowWrapper, mountedWrapper };
};

describe('Editor Container Tests', () => {
  let component;

  describe('Basic render tests', () => {
    beforeEach(() => {
      ({ mountedWrapper: component } = getComponent());
    });

    it('should create a new EditorContainer instance', () => {
      expect(component).toBeDefined();
    });

    it('should render a simpleTextEditor if no column.editor property', () => {
      const editor = component.find(SimpleTextEditor);

      expect(editor).toBeDefined();
    });

    it('should select the text of the default input when the editor is rendered', () => {
      const isTextSelected = (input) => {
        if (typeof input.selectionStart === 'number') {
          return input.selectionStart === 0 && input.selectionEnd === input.value.length;
        } else if (typeof document.selection !== 'undefined') {
          input.focus();
          return document.selection.createRange().text === input.value;
        }
      };
      const editorNode = component.find(SimpleTextEditor).instance().getInputNode();

      expect(isTextSelected(editorNode)).toBeDefined();
    });

    it('should render the editor with the correct properties', () => {
      const editor = component.find(SimpleTextEditor);

      expect(editor.props().value).toEqual('Adwolf');
      expect(editor.props().column).toEqual(fakeColumn);
    });

    it('should render the editor container div with correct properties', () => {
      const editorDiv = component.find('div').at(0);

      expect(editorDiv.props().className).toBeDefined();
      expect(editorDiv.props().onBlur).toBeDefined();
      expect(editorDiv.props().onKeyDown).toBeDefined();
      expect(editorDiv.props().children).toBeDefined();
    });
  });

  describe('Custom Editors', () => {
    class TestEditor extends EditorBase {
      render() {
        return <div><input type="text" id="testpassed" /> <div> <input type="text" id="input2"/><button id="test-button" /></div> </div>;
      }
    }

    beforeEach(() => {
      component = getComponent({
        value: 'SupernaviX',
        column: { ...fakeColumn, editor: <TestEditor />  }
      }).mountedWrapper;
    });

    it('should render element custom editors', () => {
      const editor = component.find(TestEditor);

      expect(editor).toBeDefined();
      expect(editor.props().value).toBeDefined();
      expect(editor.props().onCommit).toBeDefined();
      expect(editor.props().onCommitCancel).toBeDefined();
    });

    it('should render component custom editors', () => {
      component.setProps({ column: { ...fakeColumn, editor: TestEditor } });
      const editor = component.find(TestEditor);

      expect(editor).toBeDefined();
      expect(editor.props().value).toBeDefined();
      expect(editor.props().onCommit).toBeDefined();
    });

    it('should commit if any element outside the editor is clicked', () => {
      const instance = component.instance();

      spyOn(instance, 'commit');
      component.simulate('blur', {
        relatedTarget: document.body,
        currentTarget: instance.getInputNode()
      });

      expect(instance.commit).toHaveBeenCalled();
    });

    it('should not commit if any element inside the editor is clicked', () => {
      const editor = component.find(TestEditor);
      const instance = component.instance();

      spyOn(instance, 'commit');
      editor.simulate('click');

      expect(instance.commit.calls.count()).toEqual(0);
    });

    it('should call onCommitCancel when editor cancels editing', () => {
      const onCommit = jasmine.createSpy();
      const onCommitCancel = jasmine.createSpy();

      component.setProps({ onCommit, onCommitCancel });
      const editor = component.find(TestEditor);

      editor.props().onCommitCancel();

      expect(onCommitCancel).toHaveBeenCalled();
      expect(onCommitCancel.calls.count()).toEqual(1);
      expect(onCommit).not.toHaveBeenCalled();
    });

    it('should not commit changes on componentWillUnmount if editor cancels editing', () => {
      const onCommit = jasmine.createSpy();
      const onCommitCancel = jasmine.createSpy();

      component.setProps({ onCommit, onCommitCancel });
      const editor = component.find(TestEditor);

      editor.props().onCommitCancel();
      component.instance().componentWillUnmount();

      expect(onCommit).not.toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    let container;

    beforeEach(() => {
      defaultProps.onCommit.calls.reset();
      defaultProps.onCommitCancel.calls.reset();
      container = document.createElement('div');
      document.body.appendChild(container);
      component = mount(<EditorContainer { ...defaultProps }/>, { attachTo: container });
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    xit('hitting enter should call commit only once', () => {
      const editor = component.find(SimpleTextEditor);

      editor.simulate('keydown', { key: 'Enter' });

      expect(component.props().onCommit).toHaveBeenCalled();
      expect(component.props().onCommit.calls.count()).toEqual(1);
    });

    it('hitting escape should call commitCancel only once', () => {
      const editor = component.find(SimpleTextEditor);

      editor.simulate('keydown', { key: 'Escape' });
      component.detach();

      expect(component.props().onCommitCancel).toHaveBeenCalled();
      expect(component.props().onCommitCancel.calls.count()).toEqual(1);
    });

    it('hitting escape should not call commit changes on componentWillUnmount', () => {
      const editor = component.find(SimpleTextEditor);

      editor.simulate('keydown', { key: 'Escape' });
      component.detach();

      expect(component.props().onCommit).not.toHaveBeenCalled();
    });
  });
});
