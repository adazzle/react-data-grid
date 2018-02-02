import React, { Component, PropTypes } from 'react';
import TetherComponent from 'react-tether';
import isFunction from 'lodash/fp/isFunction';
import { ReactPageClick } from 'react-page-click';
import Immutable from 'immutable';

const toImmutableList = (data) => {
  if (!data) {
    return new Immutable.List();
  }
  if (Array.isArray(data)) {
    return Immutable.List.of(...data);
  }
  return data;
};

/* ...rest operator get from babel */
const restOperator = (obj, keys) => {
  const target = {};
  for (let i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};

const DropdownHeader = (props) => {
  return (
    <div className="dropdown-portal-header">
      <div className="dropdown-portal-title">
        {props.children}
      </div>
      <div className="dropdown-portal-buttons">
        {props.onConfirm &&
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.onConfirm}
          >
            apply
          </button>
        }
        <button
          type="button"
          className="btn btn-sm"
          onClick={props.onClose}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

DropdownHeader.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.element
};

const DropdownBody = (props) => {
  const renderItem = (paramItem, idx) => {
    const item = isFunction(paramItem.toJS) ? paramItem.toJS() : paramItem;
    const render = props.renderItem;
    return (
      <li key={idx}>{render(item, idx)}</li>
    );
  };
  const data = toImmutableList(props.data).valueSeq();
  const items = data.map(renderItem);
  console.log(items);
  return (
    <div className="dropdown-portal-body">
      {items &&
        <ul>
          {items}
        </ul>
      }
      {props.children}
    </div>
  );
};

DropdownBody.propTypes = {
  renderItem: PropTypes.func,
  data: PropTypes.array,
  children: PropTypes.element
};

DropdownBody.propTypes = {
  children: PropTypes.element
};

const DropdownToggle = (props) => {
  return (
    <a
      onClick={props.onClick}
      className={`dropdown-portal-toggle`}
    >
      {props.children}
    </a>
  );
};

DropdownToggle.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element
};

DropdownToggle.defaultProps = {
  onClick: () => {}
};

class Dropdown extends Component {
  static propTypes = {
    onHiddenDropdown: PropTypes.func,
    onShowDropdown: PropTypes.func,
    onConfirm: PropTypes.func,
    width: PropTypes.number,
    children: PropTypes.any
  }

  static defaultProps = {
    onHiddenDropdown: () => {},
    onShowDropdown: () => {},
    onConfirm: null
  }

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  onConfirm = () => {
    this.props.onConfirm();
    this.close();
  }

  toggle = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      this.props.onHiddenDropdown();
    } else {
      this.props.onShowDropdown();
    }
  }

  close = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { isOpen } = this.state;
    const { width } = this.props;
    const rest = restOperator(this.props, ['width']);
    const childArray = React.Children.toArray(this.props.children);
    let toggles = childArray.filter(child => child.type === DropdownToggle);
    let childrens = childArray.filter(child => child.type !== DropdownToggle);
    let style = {};
    let hasHeader = false;

    if (width) {
      style = { minWidth: width };
    }

    toggles = toggles.map((child) => {
      return React.cloneElement(child, { onClick: this.toggle });
    });

    childrens = childrens.map((child) => {
      hasHeader = hasHeader || (child.type === DropdownHeader);
      if (child.type === DropdownHeader && !child.props.onClose) {
        return React.cloneElement(child, {
          onConfirm: this.props.onConfirm ? this.onConfirm : null,
          onClose: this.close
        });
      }
      return child;
    });


    return (
      <TetherComponent
        attachment="top right"
        targetAttachment="bottom left"
        constraints={
          [{
            to: 'window',
            attachment: 'together'
          }]
        }
        {...rest}
      >
        {toggles}
        {isOpen && childrens &&
          <ReactPageClick notify={this.close}>
            <div className={`dropdown-portal ${(hasHeader ? 'has-header' : '')}`} style={style}>
              {childrens}
            </div>
          </ReactPageClick>
        }
      </TetherComponent>
    );
  }
}

export { DropdownBody, DropdownHeader, DropdownToggle };
export default Dropdown;
