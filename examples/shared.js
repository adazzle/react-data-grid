import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/Navbar';
import ExamplesData from './examplesData';

ReactDom.render(<Navbar exampleLinks={ExamplesData} />, document.getElementById('navbarContainer'));
