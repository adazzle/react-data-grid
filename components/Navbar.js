module.exports = React.createClass({
  render : function(){
    return(
      <div className="navbar navbar-fixed-top headroom" >
        <div className="container">
          <div className="navbar-header">
          <a href="https://github.com/adazzle/react-data-grid/fork"><img className="github-ribbon" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png" alt="Fork me on GitHub"></img></a>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
            <a className="navbar-brand" href="https://www.adazzle.com"><img className="header-logo" src="assets/images/AdazzleHeaderLogo.png" /></a> <a className="navbar-brand" href="index.html#">React Data Grid</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
              <li className="active"><a href="index.html#">Home</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Documentation <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><a href="documentation.html#/gettingstarted">Getting Started</a></li>
                  <li><a href="documentation.html#/apireference">API Reference</a></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Examples <b className="caret"></b></a>
                  <ul className="dropdown-menu">
                    <li><a href="examples.html#/basic">Basic Use</a></li>
                    <li><a href="examples.html#/resizable">Resizable Grid</a></li>
                    <li><a href="examples.html#/fixed">Frozen Columns</a></li>
                    <li><a href="examples.html#/single-row-select">Single Row Selection</a></li>
                    <li><a href="examples.html#/multi-row-select">Multiple Row Selection</a></li>
                    <li><a href="examples.html#/editable">Editable Grid</a></li>
                    <li><a href="examples.html#/formatters">Custom Formatters</a></li>
                    <li><a href="examples.html#/editors">Rich Cell Editors</a></li>
                    <li>
                      <a href="examples.html#/cell-drag">Cell drag down/Fill Column</a>
                    </li>
                    <li><a href="examples.html#/sortable">Sortable Grid</a></li>
                    <li><a href="examples.html#/filterable">Filterable Grid</a></li>
                    <li><a href="examples.html#/million-rows">One Million Rows</a></li>
                    <li><a href="examples.html#/immutable-data">Immutable Data Grid</a></li>
                    <li><a href="examples.html#/all-the-features">All-The-Features Grid</a></li>
                    <li><a href="examples.html#/custom-row-renderer">Custom Row Render</a></li>
                    <li><a href="examples.html#/custom-row-renderer">Empty Rows</a></li>
                    <li>
                      <a href="examples.html#/all-features-immutable">All-The-Features with Immutable Data</a>
                    </li>
                    </ul>
                </li>
            </ul>
          </div>
        </div>
    </div>)
  }
})
