import { useId, useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { css } from '@linaria/core';

import type { Direction } from '../../src/types';
import { DirectionContext } from '../directionContext';
import Nav from '../Nav';

export const Route = createRootRoute({
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
  const headerId = useId();
  const [direction, setDirection] = useState<Direction>('ltr');

  return (
    <DirectionContext value={direction}>
      <Nav headerId={headerId} direction={direction} onDirectionChange={setDirection} />
      <main aria-labelledby={headerId} dir={direction} className={mainClassname}>
        <Outlet />
      </main>
    </DirectionContext>
  );
}
