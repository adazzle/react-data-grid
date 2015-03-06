declare class SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: number;
  type: string;
}


declare class SyntheticKeyboardEvent extends SyntheticEvent {
  altKey: boolean;
  charCode: number;
  ctrlKey: boolean;
  getModifierState: (key: string) => void;
  key: string;
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  which: number;
}


declare class SyntheticMouseEvent extends SyntheticEvent {
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  relatedTarget: EventTarget;

  getModifierState: (key: string) => void;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

//https://github.com/facebook/flow/blob/master/lib/dom.js#L371
declare class HTMLFormElement extends HTMLElement {
    [name: string]: any;
    acceptCharset: string;
    action: string;
    elements: HTMLCollection;
    encoding: string;
    enctype: string;
    length: number;
    method: string;
    name: string;
    target: string;

    item(name?: any, index?: any): any;
    namedItem(name: string): any;
    reset(): void;
    submit(): void;
}

//https://github.com/facebook/flow/blob/master/lib/dom.js#L402
declare class HTMLInputElement extends HTMLElement {
  accept: string;
    align: string;
    alt: string;
    border: string;
    checked: boolean;
    complete: boolean;
    defaultChecked: boolean;
    defaultValue: string;
    dynsrc: string;
    form: HTMLFormElement;
    height: string;
    hspace: number;
    indeterminate: boolean;
    loop: number;
    lowsrc: string;
    maxLength: number;
    name: string;
    readOnly: boolean;
    selectionEnd: number;
    selectionStart: number;
    size: number;
    src: string;
    start: string;
    status: boolean;
    type: string;
    useMap: string;
    value: string;
    vrml: string;
    vspace: number;
    width: string;

    createTextRange(): TextRange;
    select(): void;
    setSelectionRange(start: number, end: number): void;

    //manually added
    focus(): void;

}

//https://github.com/facebook/flow/blob/master/lib/dom.js#L449

declare class TextRange {
    boundingLeft: number;
    htmlText: string;
    offsetLeft: number;
    boundingWidth: number;
    boundingHeight: number;
    boundingTop: number;
    text: string;
    offsetTop: number;
    moveToPoint(x: number, y: number): void;
    queryCommandValue(cmdID: string): any;
    getBookmark(): string;
    move(unit: string, count?: number): number;
    queryCommandIndeterm(cmdID: string): boolean;
    scrollIntoView(fStart?: boolean): void;
    findText(string: string, count?: number, flags?: number): boolean;
    execCommand(cmdID: string, showUI?: boolean, value?: any): boolean;
    getBoundingClientRect(): ClientRect;
    moveToBookmark(bookmark: string): boolean;
    isEqual(range: TextRange): boolean;
    duplicate(): TextRange;
    collapse(start?: boolean): void;
    queryCommandText(cmdID: string): string;
    select(): void;
    pasteHTML(html: string): void;
    inRange(range: TextRange): boolean;
    moveEnd(unit: string, count?: number): number;
    getClientRects(): ClientRectList;
    moveStart(unit: string, count?: number): number;
    parentElement(): Element;
    queryCommandState(cmdID: string): boolean;
    compareEndPoints(how: string, sourceRange: TextRange): number;
    execCommandShowHelp(cmdID: string): boolean;
    moveToElementText(element: Element): void;
    expand(Unit: string): boolean;
    queryCommandSupported(cmdID: string): boolean;
    setEndPoint(how: string, SourceRange: TextRange): void;
    queryCommandEnabled(cmdID: string): boolean;
}
