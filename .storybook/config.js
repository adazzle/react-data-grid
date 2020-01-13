import React, { StrictMode } from 'react';
import { addDecorator, configure } from '@storybook/react';

addDecorator(function(render) {
  return React.createElement(StrictMode, null, render());
});

function loadStories() {
  require('../stories/index.tsx');
}

configure(loadStories, module);
