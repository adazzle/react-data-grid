import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import CellActionShape  from 'common/prop-shapes/CellActionShape';

class CellAction extends React.Component {
  static propTypes = {
    action: PropTypes.shape(CellActionShape).isRequired,
    isFirst: PropTypes.bool.isRequired
  }

  state = {  isMenuOpen: false };

  onToggleMenu = () => {
    this.setState((prevState) => {
      return { isMenuOpen: !prevState.isMenuOpen };
    });
  }

  onHideMenu = () => {
    this.setState({isMenuOpen: false});
  }

  onGetMenuOptions = () => {
    return this.props.action.actions.map((action, index) => {
      return <span key={index} onClick={action.callback}>{action.text}</span>;
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

    const cellActionClasses = classNames('rdg-cell-action', {
      'rdg-cell-action-last': this.props.isFirst
    });

    const actionButtonClasses = classNames('rdg-cell-action-button', {
      'rdg-cell-action-button-toggled': this.state.isMenuOpen
    });

    return (
      <div className={cellActionClasses} onMouseLeave={this.onActionButtonBlur}>
        <div className={actionButtonClasses} onClick={this.onActionIconClick}>
            { typeof(this.props.action.icon) === 'string' ? <span className={this.props.action.icon}></span> : this.props.action.icon }
        </div>
        {
          isActionMenu &&
          this.state.isMenuOpen &&
          <div className="rdg-cell-action-menu">
            {this.onGetMenuOptions()}
          </div>
        }
      </div>
    );
  }
}

export default CellAction;
