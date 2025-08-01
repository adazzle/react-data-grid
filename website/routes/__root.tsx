import '../root.css';

import { useState } from 'react';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { css } from '@linaria/core';

import type { Direction } from '../../src/types';
import { DirectionContext } from '../directionContext';
import Nav from '../Nav';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'description',
        content: 'Feature-rich and customizable data grid React component.'
      },
      {
        title: 'React Data Grid'
      }
    ]
  }),
  component: Root
});

const mainClassname = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  block-size: 100vh;
  padding: 8px;
  contain: inline-size;
`;

function Root() {
  const [direction, setDirection] = useState<Direction>('ltr');

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <DirectionContext value={direction}>
          <Nav direction={direction} onDirectionChange={setDirection} />
          <main dir={direction} className={mainClassname}>
            <Outlet />
          </main>
        </DirectionContext>
        <Scripts />
      </body>
    </html>
  );
}
