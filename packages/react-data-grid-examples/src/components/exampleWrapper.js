const React = require('react');
const classNames = require('classnames');
require('../assets/css/exampleWrapper.css');

const emptyAction = () => { };
const disableLink = (e) => e.stopPropagation();

const exampleWrapper = ({
  WrappedComponent,
  exampleName,
  examplePath,
  examplePlaygroundLink,
  exampleDescription }) => {
  const doesExamplePlayGroundLinkExist = examplePlaygroundLink === undefined ? false : true;
  const playgroundLinkClass = classNames({
    'disabled-link': !doesExamplePlayGroundLinkExist
  });

  const examplePlaygroundLinkAction = doesExamplePlayGroundLinkExist ? emptyAction : disableLink;

  return React.createClass({
    render() {
      return (
        <div>
          <div className="link-right">
            <a href={examplePath}>Jump to source</a> |
            <a href={examplePlaygroundLink} className={playgroundLinkClass} onClick={examplePlaygroundLinkAction}>Play around with it</a>
          </div>
          <h3>{ exampleName }</h3>
          <p>{ exampleDescription }</p>
          <WrappedComponent />
        </div>
      );
    }
  });
};

module.exports = exampleWrapper;
