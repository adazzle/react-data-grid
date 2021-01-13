import 'core-js/stable';
import '../style/index.less';
import '../stories/index.less';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

if (typeof ResizeObserver === 'undefined') {
  window.ResizeObserver = Polyfill;
}
