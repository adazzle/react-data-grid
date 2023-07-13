import type { Maybe } from '../types';

export function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export function scrollIntoView(
  element: Maybe<Element>,
  coverOptions?: boolean | ScrollIntoViewOptions
) {
  if(element?.scrollIntoView) {
    let options: typeof coverOptions = { inline: 'nearest', block: 'nearest' };
    if (typeof coverOptions === 'boolean') {
      options = coverOptions;
    } else if(typeof coverOptions === 'object') {
      options = Object.assign(options, coverOptions);
    }
    element.scrollIntoView(options);
  }
}
