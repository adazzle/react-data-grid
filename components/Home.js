import React from 'react';
import { Link } from 'react-router-dom';

import ExampleList from './ExampleList';

function Home() {
  return (
    <div>
      <header id="head">
        <div className="container">
          <div className="row">
            <div className="main-logo"></div>
            <h1 className="lead">React Data Grid </h1>
            <p className="tagline">Excel-like grid component built with React</p>
            <p>
              <Link className="btn btn-default btn-lg" to="/examples">DEMO</Link>
              <a className="btn btn-action btn-lg" href="https://github.com/adazzle/react-data-grid">DOWNLOAD NOW</a>
            </p>
          </div>
        </div>
      </header>

      <div className="jumbotron">
        <div className="container">
          <div className="row" id="demo">
            <div className="col-md-3 col-sm-6">
              <div className="h-caption"><h4><i className="fa fa-flash fa-5"></i>Lightning Fast Rendering</h4></div>
              <div className="h-body text-center">
                <p>Combines the performance power of React as well as partial rendering techniques in order to smoothly scroll though hundreds of thousands of rows.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="h-caption"><h4><i className="fa fa-edit fa-5"></i>Rich Editing and Formatting</h4></div>
              <div className="h-body text-center">
                <p>View and edit cells using a wide range of formatters and editors. If these don't suit your needs, you can easily create and plugin your own</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="h-caption"><h4><i className="fa fa-cogs fa-5"></i>Configurable & Customizable</h4></div>
              <div className="h-body text-center">
                <p>Quickly configure and customise features such as grid and column properties, row and cell renderers. As the Grid is a React component it is easy to extend and add custom functionality.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="h-caption"><h4><i className="fa fa-file-excel-o fa-5"></i>Packed full of Excel Features</h4></div>
              <div className="h-body text-center">
                <p>Full keyboard navigation, cell copy & paste, cell drag down, frozen columns, column resizing, sorting, filtering and many more features on the way.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="main-grid">
            <div className="grid-examples">
              <h3>Check out these examples</h3>
              <div id="grid-examples-div">
                <ExampleList className="nav bs-docs-sidenav" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="jumbotron top-space">
            <div className="docs-section">
              <h2>Quick Start </h2>
              <h3 id="js-installation">Installation</h3>
              <h4>Using Common JS</h4>
              <p>React Data Grid is available in the npm repository. You can install it from the command line using the following commands</p>
              <p><kbd>npm install react --save</kbd></p>
              <p><kbd>npm install react-data-grid --save</kbd></p>
              <p>Once downloaded, require both React and React Data Grid and you should be good to go</p>
              <div className="code-block js">
                <pre>import React from 'react'; <br />import ReactDataGrid from 'react-data-grid';</pre>
              </div>
              <p>If you want to use extra features such as built in editors, formatters, toolbars and other plugins, you need to require the addons module as well</p>
              <div className="code-block js">
                <pre>import ReactDataGridPlugins from 'react-data-grid/addons';</pre>
              </div>
              <br />
              <h4>Using Distribution Scripts</h4>
              <p>If you prefer not to use a module system, you can reference the distribution scripts directly in your html pages. First you need to download the scripts. This can be done in 3 ways, either download directly from github source, using npm as above</p>
              <div className="code-block js">
                <pre>&lt;script src="//fb.me/react-0.14.6.js"&gt;&lt;/script&gt;<br />&lt;script type="text/javascript" src="react-data-grid/dist/react-data-grid.js"&gt;&lt;/script&gt;</pre>
              </div>

              And include react-data-grid.ui-plugins.js to use advanced features. Plugins will be availble on the ReactDataGridPlugins namespace
              <div className="code-block js">
                <pre>&lt;script type="text/javascript" src="react-data-grid/dist/react-data-grid.ui-plugins.js"&gt;&lt;/script&gt;"</pre>
              </div>

            </div>
          </div>
        </div>
      </div>

      <footer id="footer" className="top-space">

        <div className="footer1">
          <div className="container">
            <div className="row">


            </div>
          </div>
        </div>

        <div className="footer2">
          <div className="container">
            <div className="row">

              <div className="col-md-6 widget">
                <div className="widget-body">
                  <p className="simplenav">

                  </p>
                </div>
              </div>

              <div className="col-md-6 widget">
                <div className="widget-body">

                </div>
              </div>

            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}

export default Home;
