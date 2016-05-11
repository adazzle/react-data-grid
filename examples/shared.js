import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import ExampleScripts from './scripts';

ReactDom.render(<Navbar exampleLinks={ExampleScripts} />, document.getElementById('navbarContainer'));
