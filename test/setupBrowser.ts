import { configure as vitestReactConfigure } from 'vitest-browser-react/pure';

// vitest-browser-react also automatically injects render method on the page
// need to import it so TypeScript can pick up types
import 'vitest-browser-react';

import { locators } from '@vitest/browser/context';

vitestReactConfigure({
  reactStrictMode: true
});

locators.extend({
  getBySelector(selector: string) {
    return selector;
  }
});
