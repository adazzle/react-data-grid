const React          = require('react');
const ReactDOM      = require('react-dom');
const joinClasses    = require('classnames');
const ExcelColumn    = require('./PropTypeShapes/ExcelColumn');
require('../../../themes/react-data-grid-header.css');

import PropTypes from 'prop-types';

function simpleCellRenderer(group: {name: string}): ReactElement {
  let headerText = group.get('name');
  return <div className="react-grid-HeaderGroupCell__value">{headerText}</div>;
}

class HeaderGroupCell extends React.Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    group: PropTypes.shape(ExcelColumn).isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    renderer: simpleCellRenderer
  };

  getCell = (): ReactComponent => {
    if (React.isValidElement(this.props.renderer)) {
      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
      if (typeof this.props.renderer.type === 'string') {
        return React.cloneElement(this.props.renderer, {height: this.props.height});
      }
      return React.cloneElement(this.props.renderer, {column: this.props.group, height: this.props.height});
    }
    return this.props.renderer(this.props.group);
  };

  getStyle = (): {width:number; left: number; display: string; position: string; overflow: string; height: number; margin: number; textOverflow: string; whiteSpace: string } => {
    return {
      width: this.props.group.get('width'),
      left: this.props.group.get('left'),
      display: 'inline-block',
      position: 'absolute',
      height: this.props.height,
      margin: 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  };

  setScrollLeft = (scrollLeft: number) => {
    let node = ReactDOM.findDOMNode(this);
    node.style.webkitTransform = `translate3d(${scrollLeft}px, 0px, 0px)`;
    node.style.transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
  };

  removeScroll = () => {
    let node = ReactDOM.findDOMNode(this);
    if (node) {
      let transform = 'none';
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  };

  render(): ?ReactElement {
    let className = joinClasses({
      'react-grid-HeaderGroupCell': true,
      'react-grid-HeaderGroupCell--locked': this.props.group.get('locked')
    });
    className = joinClasses(className, this.props.className, this.props.group.get('cellClass'));
    let cell = this.getCell();
    return (
      <div className={className} style={this.getStyle()}>
        {cell}
      </div>
    );
  }
}

module.exports = HeaderGroupCell;
