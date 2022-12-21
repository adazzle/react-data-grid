import type { Maybe } from '../types';

export function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export function scrollIntoView(element: Maybe<HTMLDivElement>) {
  element?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}
