import { configure } from '@testing-library/react';
import { configure as vitestReactConfigure } from 'vitest-browser-react/pure';

configure({
  reactStrictMode: true,
  throwSuggestions: true
});

vitestReactConfigure({
  reactStrictMode: true
});
