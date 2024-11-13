import { configure } from '@testing-library/react';
import { configure as vitestReactConfigure } from 'vitest-browser-react/pure';

// vitest-browser-react also automatically injects render method on the page
// need to import it so TypeScript can pick up types
import 'vitest-browser-react';

configure({
  reactStrictMode: true,
  throwSuggestions: true
});

vitestReactConfigure({
  reactStrictMode: true
});
