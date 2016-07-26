let KeyboardHandlerMixin = {
  getInitialState() {
    return {keysDown: {}};
  },
  onKeyDown(e: SyntheticKeyboardEvent) {
    if (this.isCtrlKeyHeldDown(e)) {
      this.checkAndCall('onPressKeyWithCtrl', e);
    } else if (this.isKeyExplicitlyHandled(e.key)) {
      // break up individual keyPress events to have their own specific callbacks
      // this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
      let callBack = 'onPress' + e.key;
      this.checkAndCall(callBack, e);
    } else if (this.isKeyPrintable(e.keyCode)) {
      this.checkAndCall('onPressChar', e);
    }

    // Track which keys are currently down for shift clicking etc
    let keysDown = this.state.keysDown || {};
    keysDown[e.keyCode] = true;
    this.setState({keysDown});

    if (this.props.onGridKeyDown && typeof this.props.onGridKeyDown === 'function') {
      this.props.onGridKeyDown(e);
    }
  },

  onKeyUp(e) {
    // Track which keys are currently down for shift clicking etc
    let keysDown = this.state.keysDown || {};
    delete keysDown[e.keyCode];
    this.setState({keysDown});

    if (this.props.onGridKeyUp && typeof this.props.onGridKeyUp === 'function') {
      this.props.onGridKeyUp(e);
    }
  },
  isKeyDown(keyCode) {
    if (!this.state.keysDown) return false;
    return keyCode in this.state.keysDown;
  },

  isSingleKeyDown(keyCode) {
    if (!this.state.keysDown) return false;
    return keyCode in this.state.keysDown && Object.keys(this.state.keysDown).length === 1;
  },

  // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
  isKeyPrintable(keycode: number): boolean {
    let valid =
        (keycode > 47 && keycode < 58)   || // number keys
        keycode === 32 || keycode === 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  },

  isKeyExplicitlyHandled(key: string): boolean {
    return typeof this['onPress' + key] === 'function';
  },

  isCtrlKeyHeldDown(e: SyntheticKeyboardEvent): boolean {
    return e.ctrlKey === true && e.key !== 'Control';
  },

  checkAndCall(methodName: string, args: any) {
    if (typeof this[methodName] === 'function') {
      this[methodName](args);
    }
  }
};

module.exports = KeyboardHandlerMixin;
