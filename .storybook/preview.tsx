import 'core-js/stable';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import { css } from '@linaria/core';

// @ts-expect-error
if (typeof ResizeObserver === 'undefined') {
  // @ts-expect-error
  window.ResizeObserver = Polyfill;
}

css`
:global() {
  body,
  html {
    padding: 0 !important;
    margin: 0 !important;
    font-family: sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100vh;
    padding: 8px;
  }

  .rdg.fill-grid {
    height: 100%;
  }

  .rdg.small-grid {
    height: 300px;
  }

  .rdg.big-grid {
    height: 600px;
  }

  :root {
    @media (prefers-color-scheme: light) {
      background-color: #fff;
      color: #111;
    }

    @media (prefers-color-scheme: dark) {
      background-color: #111;
      color: #fff;
    }
  }

  .rdg-cell .Select {
    max-height: 30px;
    font-size: 12px;
    font-weight: normal;
  }
}
`;
