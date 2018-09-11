import { isCtrlKeyHeldDown, isKeyPrintable } from 'common/utils/keyboardUtils';

describe('isKeyPrintable', () => {
  it('should return true if ctrl key is pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: true, key: 's' })).toBe(true);
  });

  it('should return true if meta key is pressed', () => {
    expect(isCtrlKeyHeldDown({ metaKey: true, key: 's' })).toBe(true);
  });

  it('should return false if ctrl key is not pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: false, key: 's' })).toBe(false);
  });

  it('should return false if only ctrl key is pressed', () => {
    expect(isCtrlKeyHeldDown({ ctrlKey: true, key: 'Control' })).toBe(false);
  });
});

describe('isKeyPrintable', () => {
  it('should return true for printable keys', () => {
    expect(isKeyPrintable(50)).toBe(true);
    expect(isKeyPrintable(32)).toBe(true);
    expect(isKeyPrintable(70)).toBe(true);
    expect(isKeyPrintable(220)).toBe(true);
  });

  it('should return false for unprintable keys', () => {
    expect(isKeyPrintable(10)).toBe(false);
    expect(isKeyPrintable(14)).toBe(false);
    expect(isKeyPrintable(140)).toBe(false);
    expect(isKeyPrintable(240)).toBe(false);
  });
});
