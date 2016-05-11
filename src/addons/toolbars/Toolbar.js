const React = require('react');

const Toolbar = React.createClass({
  propTypes: {
    onAddRow: React.PropTypes.func,
    onToggleFilter: React.PropTypes.func,
    enableFilter: React.PropTypes.bool,
    rowsInfo: React.PropTypes.object,
    enableDisplay: React.PropTypes.bool
  },

  onAddRow() {
    if (this.props.onAddRow !== null && this.props.onAddRow instanceof Function) {
      this.props.onAddRow({newRowIndex: this.props.rowsInfo.total});
    }
  },

  getDefaultProps(): {enableAddRow: boolean} {
    return {
      enableAddRow: true,
      enableDisplay: false
    };
  },

  renderAddRowButton(): ReactElement {
    if (this.props.onAddRow ) {
      return (<button type="button" className="btn" onClick={this.onAddRow}>
        Add Row
      </button>);
    }
  },

  renderToggleFilterButton(): ReactElement {
    if (this.props.enableFilter) {
      return (<button type="button" className="btn" onClick={this.props.onToggleFilter}>
      Filter Rows
    </button>);
    }
  },

  renderDisplayText() {
    if (this.props.enableDisplay) {
      let _msg = ``;
      if (this.props.rowsInfo && this.props.rowsInfo.total > 0) {
        _msg = `Displaying ${this.props.rowsInfo.start} - ${this.props.rowsInfo.end} of ${this.props.rowsInfo.total} row${this.props.rowsInfo.total === 1 ? '' : 's'}`;
      }
      return (<label>{_msg}</label>);
    }
  },

  render(): ?ReactElement {
    return (
      <div className="react-grid-Toolbar">
        <div className="display-text">
          {this.renderDisplayText()}
        </div>
        <div className="tools">
          {this.renderAddRowButton()}
          {this.renderToggleFilterButton()}
        </div>
      </div>);
  }
});

module.exports = Toolbar;
