module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Getting Started </h2>
        <h3 id="js-installation">Installation</h3>
        <h4>Using Common JS</h4>
        <p>React Data Grid is available in the npm repository. You can install it from the command line using the following commands</p>
        <p><kbd>npm install react-data-grid --save</kbd></p>
        <p>Once downloaded, require both React and React Grid and you should be good to go</p>
        <div className="code-block js">
          <pre>
            var React = require('react');
            <br />
            var ReactDataGrid = require('react-data-grid');
          </pre>
        </div>
        <p>If you want to use extra features such as built in editors, formatters, toolbars and other plugins, you need to require the addons module instead</p>
        <div className="code-block js">
          <pre>var ReactDataGrid = require('react-data-grid/addons');</pre>
        </div>
        <br/>
        <h4>Using Distribution Scripts</h4>
        <p>If you prefer not to use a module system, you can reference the distribution scripts directly in your html pages. First you need to download the scripts. This can be done in 3 ways, either download directly from github source, using npm as above
        </p>
        <div className="code-block js">
          <pre>&lt;script src="//fb.me/react-0.14.6.js"&gt;&lt;/script&gt;<br/>&lt;script type="text/javascript" src="react-data-grid/dist/react-data-grid.js"&gt;&lt;/script&gt;</pre>
        </div>
        <p>Or include react-data-grid.ui-plugins.js to use advanced features</p>
        <div className="code-block js">
          <pre>&lt;script type="text/javascript" src="react-data-grid/dist/react-data-grid.ui-plugins.js"&gt;&lt;/script&gt;</pre>
        </div>
      </div>
    );
  }
});
