export function isCtrlKeyHeldDown(e: React.KeyboardEvent): boolean {
  return (e.ctrlKey === true || e.metaKey === true) && e.key !== 'Control';
}
