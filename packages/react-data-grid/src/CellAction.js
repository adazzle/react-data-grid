import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const CellActionShape = require('./PropTypeShapes/CellActionShape');

class CellAction extends React.Component {
  static propTypes = {
    action: PropTypes.shape(CellActionShape).isRequired,
    isFirst: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {isMenuOpen: false};
  }

  onToggleMenu = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen});
  }

  onHideMenu = () => {
    this.setState({isMenuOpen: false});
  }

  onGetMenuOptions = () => {
    return this.props.action.actions.map(action => {
      return <span onClick={action.callback}>{action.text}</span>;
    });
  }

  isActionMenu = () => {
    return !this.props.action.callback && (this.props.action.actions && this.props.action.actions.length);
  }

  onActionButtonBlur = () => {
    if (this.isActionMenu()) {
      this.onHideMenu();
    }
  }

  onActionIconClick = () => {
    if (!this.isActionMenu()) {
      this.props.action.callback();
    } else if (this.props.action.actions && this.props.action.actions.length) {
      this.onToggleMenu();
    }
  }

  render() {
    const isActionMenu = this.isActionMenu();

    const cellActionClasses = classNames({
      'cell-action': true,
      'cell-action-last': this.props.isFirst
    });

    const actionButtonClasses = classNames({
      'action-button': true,
      'action-button-toggled': this.state.isMenuOpen
    });

    return (
      <div className={cellActionClasses} onMouseLeave={this.onActionButtonBlur}>
        <div className={actionButtonClasses} onClick={this.onActionIconClick}>
          <span className={this.props.action.icon}></span>
        </div>
        {
          isActionMenu &&
          this.state.isMenuOpen &&
          <div className="action-menu">
            {this.onGetMenuOptions()}
          </div>
        }
      </div>
    );
  }
}

export default CellAction;
