import React from 'react';
import { mount, shallow } from 'enzyme';
const COMPONENT_DID_MOUNT_SOURCE = 'CDM';
const COMPONENT_DID_UPDATE_SOURCE = 'CDU';

class FocusableComponentTestRunner {
  constructor({ Component, props, getNewSelection }) {
    this._Component = Component;
    this._props = props;
    this._getNewSelection = getNewSelection;
  }

  get componentNode() {
    return this._componentWrapper.node;
  }

  get componentPrototype() {
    return this._Component.prototype;
  }

  _assertComponentDidMount() {
    it('checkFocus gets called correctly on componentDidMount', () => {
      const { componentDidMount, checkFocus } = this.componentPrototype;

      expect(componentDidMount.calls.count()).toBe(1);
      expect(checkFocus.calls.count()).toBe(1);
      expect(checkFocus.calls.first().args).toEqual([ COMPONENT_DID_MOUNT_SOURCE ]);
    });
  }

  _assertComponentDidUpdate() {
    it('checkFocus gets called on componentDidUpdate', () => {
      const { componentDidUpdate, checkFocus } = this.componentPrototype;
      checkFocus.calls.reset();

      this._componentWrapper.setProps({ idx: this._props.idx + 1 });

      expect(componentDidUpdate.calls.count()).toBe(1);
      expect(checkFocus.calls.count()).toBe(1);
      expect(checkFocus.calls.first().args).toEqual([ COMPONENT_DID_UPDATE_SOURCE ]);
    });
  }

  _assertShouldComponentUpdate() {
    it('component should update when selection changes to another element', () => {
      const { componentDidUpdate } = this.componentPrototype;
      const selected = this._getNewSelection(this._props);

      this._componentWrapper.setProps({ cellMetaData: { selected }});
      expect(componentDidUpdate.calls.count()).toBe(1);
    });

    it('component should update when the element is about to be selected', () => {
      // Arange.
      const originalSelection = this._props.cellMetaData.selected;
      const newSelection = Object.assign({ }, originalSelection, this._getNewSelection(this._props));
      const newCellMetaData = { selected: newSelection };

      // Act.
      this._componentWrapper = mount(<this._Component {...this._props} cellMetaData={newCellMetaData} />);
      this._componentWrapper.setProps({ cellMetaData: originalSelection });

      // Assert.
      expect(this.componentPrototype.componentDidUpdate.calls.count()).toBe(1);
    });

    it('component should not update when the element is neither selected or about to be selected', () => {
      // Arange.
      let selection = this._getNewSelection(this._props);
      const newSelection = Object.assign({ }, this._props.cellMetaData.selected, selection);
      const newCellMetaData = { selected: newSelection };

      // Act.
      this._componentWrapper = mount(<this._Component {...this._props} cellMetaData={newCellMetaData} />);
      this._componentWrapper.setProps({ cellMetaData: { selected: this._getNewSelection(selection) }});

      // Assert.
      expect(this.componentPrototype.componentDidUpdate).not.toHaveBeenCalled();
    });
  }

  _addLifeCycleMethodsBeforeEach() {
    beforeEach(() => {
      spyOn(this.componentPrototype, 'checkFocus');
      spyOn(this.componentPrototype, 'componentDidMount').and.callFake(() => this.componentPrototype.checkFocus(COMPONENT_DID_MOUNT_SOURCE));
      spyOn(this.componentPrototype, 'componentDidUpdate').and.callFake(() => this.componentPrototype.checkFocus(COMPONENT_DID_UPDATE_SOURCE));
      this._componentWrapper = mount(<this._Component {...this._props} />);
    });
  }

  _runLifecycleAsserts() {
    describe('Lifecycle methods', () => {
      this._addLifeCycleMethodsBeforeEach();
      this._assertComponentDidMount();
      this._assertComponentDidUpdate();
      this._assertShouldComponentUpdate();
    });
  }

  _assertFocusActions() {
    it('should not focus when not scrolling', () => {
      this._componentWrapper = mount(<this._Component {...this._props} />);

      expect(this.componentPrototype.focus).not.toHaveBeenCalled();
    });

    it('should not focus when scrolling but not selected', () => {
      const selected = this._getNewSelection(this._props);
      let cellMetaData = { selected, isScrollingVerticallyWithKeyboard: true, isScrollingHorizontallyWithKeyboard: true };

      this._componentWrapper = mount(<this._Component {...this._props} cellMetaData={cellMetaData} />);

      expect(this.componentPrototype.focus).not.toHaveBeenCalled();
    });

    it('should focus when scrolling and selected', () => {
      let cellMetaData = Object.assign({ }, this._props.cellMetaData, { isScrollingVerticallyWithKeyboard: true, isScrollingHorizontallyWithKeyboard: true });
      this._componentWrapper = shallow(<this._Component {...this._props} cellMetaData={cellMetaData} />, { lifecycleExperimental: true });
      this._componentWrapper.setProps({cellMetaData});
      expect(this.componentPrototype.focus).toHaveBeenCalled();
    });
  }

  _addFocusBeforeEach() {
    beforeEach(() => {
      spyOn(this.componentPrototype, 'focus');
    });
  }

  _runFocusAsserts() {
    describe('Focus', () => {
      this._addFocusBeforeEach();
      this._assertFocusActions();
    });
  }

  run() {
    describe('FocusableComponent Tests', () => {
      this._runLifecycleAsserts();
      this._runFocusAsserts();
    });
  }
}

export default FocusableComponentTestRunner;
