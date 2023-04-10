'use client';

import './global.css';
import { useState } from 'react';
import { css } from '@linaria/core';

import type { Direction } from '../src/types';
import { DirectionContextProvider } from './DirectionContext';
import Nav from './nav';

const mainClassname = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  block-size: 100vh;
  padding: 8px;
  overflow: hidden;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<Direction>('ltr');

  return (
    <html lang="en">
      <head>
        <title>React Data Grid</title>
        <meta
          name="description"
          content="Feature-rich and customizable data grid React component."
        />
      </head>
      <body>
        <div id="root">
          <Nav direction={direction} onDirectionChange={setDirection} />
          <main className={mainClassname}>
            <DirectionContextProvider value={direction}>{children}</DirectionContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
