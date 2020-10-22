import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.tsx');
}

configure(loadStories, module);
