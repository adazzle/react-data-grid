import React from 'react';
import ReactDom from 'react-dom';
import ExampleList from './components/ExampleList';
import ExamplesData from './examplesData';

window.React = React;

ReactDom.render(<ExampleList links={ExamplesData} className="nav bs-docs-sidenav" />, document.getElementById('grid-examples-div'));
