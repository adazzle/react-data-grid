import 'core-js/stable';
import '../style/index.less';
import '../stories/index.less';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

// @ts-expect-error
if (typeof ResizeObserver === 'undefined') {
  // @ts-expect-error
  window.ResizeObserver = Polyfill;
}
