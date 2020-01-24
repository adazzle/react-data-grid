import { isCtrlKeyHeldDown } from './keyboardUtils';

describe('isCtrlKeyHeldDown', () => {
  it('should return true if ctrl key is pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: true, key: 's' } as React.KeyboardEvent)).toBe(true);
  });

  it('should return true if meta key is pressed', () => {
    expect(isCtrlKeyHeldDown({ metaKey: true, key: 's' } as React.KeyboardEvent)).toBe(true);
  });

  it('should return false if ctrl key is not pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: false, key: 's' } as React.KeyboardEvent)).toBe(false);
  });

  it('should return false if only ctrl key is pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: true, key: 'Control' } as React.KeyboardEvent)).toBe(false);
  });
});
