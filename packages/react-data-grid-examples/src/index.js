import React from 'react';
import ReactDom from 'react-dom';
import ExampleList from './components/ExampleList';
import ExampleScripts from './scripts';

window.React = React;

ReactDom.render(<ExampleList links={ExampleScripts} className="nav bs-docs-sidenav" />, document.getElementById('grid-examples-div'));
