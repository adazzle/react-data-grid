import 'core-js/stable';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import { StrictMode } from 'react';
import { addDecorator } from '@storybook/react';

// @ts-expect-error
if (typeof ResizeObserver === 'undefined') {
  // @ts-expect-error
  window.ResizeObserver = Polyfill;
}

addDecorator(function(render) {
  return (
    <StrictMode>
      {render()}
    </StrictMode>
  );
});
