import React from 'react';
import classNames from 'classnames';

import '../assets/css/exampleWrapper.css';

const emptyAction = () => { };
const disableLink = (e) => e.stopPropagation();

export default function exampleWrapper({
  WrappedComponent,
  exampleName,
  examplePath,
  examplePlaygroundLink,
  exampleDescription
}) {
  const doesExamplePlayGroundLinkExist = examplePlaygroundLink !== undefined;
  const playgroundLinkClass = classNames({
    'disabled-link': !doesExamplePlayGroundLinkExist
  });

  const examplePlaygroundLinkAction = doesExamplePlayGroundLinkExist ? emptyAction : disableLink;

  return class extends React.Component {
    render() {
      return (
        <div>
          <div className="link-right">
            <a href={examplePath}>Jump to source</a> |
            <a href={examplePlaygroundLink} className={playgroundLinkClass} onClick={examplePlaygroundLinkAction}>Play around with it</a>
          </div>
          <h3>{ exampleName }</h3>
          <div>{ exampleDescription }</div>
          <WrappedComponent />
        </div>
      );
    }
  };
}
