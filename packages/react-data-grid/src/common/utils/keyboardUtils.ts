export function isKeyPrintable(keycode: number): boolean {
  return (keycode > 47 && keycode < 58) // number keys
    || keycode === 32 || keycode === 13 // spacebar & return key(s) (if you want to allow carriage returns)
    || (keycode > 64 && keycode < 91) // letter keys
    || (keycode > 95 && keycode < 112) // numpad keys
    || (keycode > 185 && keycode < 193) // ;=,-./` (in order)
    || (keycode > 218 && keycode < 223); // [\]' (in order)
}

export function isCtrlKeyHeldDown(e: React.KeyboardEvent): boolean {
  return (e.ctrlKey === true || e.metaKey === true) && e.key !== 'Control';
}
