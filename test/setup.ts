import { configure } from '@testing-library/react';

import '@testing-library/jest-dom/vitest';

configure({
  reactStrictMode: true,
  throwSuggestions: true
});
