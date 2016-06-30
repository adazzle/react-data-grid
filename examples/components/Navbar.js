import React, {PropTypes} from 'react';
import ExampleList from './ExampleList';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar navbar-fixed-top headroom" >
        <div className="container">
          <div className="navbar-header">
          <a href="https://github.com/adazzle/react-data-grid/fork"><img className="github-ribbon" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-green@2x.png" alt="Fork me on GitHub"></img></a>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
            <a className="navbar-brand" href="https://www.adazzle.com"><img className="header-logo" src="assets/images/AdazzleHeaderLogo.png" /></a> <a className="navbar-brand" href="index.html#">React Data Grid</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
              <li className="active"><a href="index.html">Home</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Documentation <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><a href="documentation.html#/gettingstarted">Getting Started</a></li>
                  <li><a href="documentation.html#/apireference">API Reference</a></li>
                  <li><a href="documentation.html#/componentsDocs">Component Documentation</a></li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Examples <b className="caret"></b></a>
                <ExampleList links={this.props.exampleLinks} className="dropdown-menu" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  exampleLinks: PropTypes.array.isRequired
};

export default Navbar;
