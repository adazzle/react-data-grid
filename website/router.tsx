import { createRouter as createTanStackRouter, ErrorComponent } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export function createRouter() {
  return createTanStackRouter({
    basepath: '/react-data-grid/',
    routeTree,
    caseSensitive: true,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFound,
    defaultPendingMinMs: 0,
    defaultPreload: 'intent',
    defaultStructuralSharing: true,
    scrollRestoration: true
  });
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

function NotFound() {
  return 'Nothing to see here';
}
