import 'core-js/stable';
import '../style/index.less';
import '../stories/index.less';
import { StrictMode } from 'react';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import { addDecorator } from '@storybook/react';

// @ts-expect-error
if (typeof ResizeObserver === 'undefined') {
  // @ts-expect-error
  window.ResizeObserver = Polyfill;
}

addDecorator(render => (
  <StrictMode>
    {render()}
  </StrictMode>
));
