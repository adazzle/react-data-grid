export declare function isCtrlKeyHeldDown(e: React.KeyboardEvent): boolean;
export declare function isDefaultCellInput(event: React.KeyboardEvent<HTMLDivElement>): boolean;
/**
 * By default, the following navigation keys are enabled while an editor is open, under specific conditions:
 * - Tab:
 *   - The editor must be an <input>, a <textarea>, or a <select> element.
 *   - The editor element must be the only immediate child of the editor container/a label.
 */
export declare function onEditorNavigation({ key, target }: React.KeyboardEvent<HTMLDivElement>): boolean;
