import { vi } from 'vitest';

let index = 0;
vi.mock('@linaria/core', () => {
  return {
    css() {
      return `mock-css-${index++}`;
    }
  };
});
