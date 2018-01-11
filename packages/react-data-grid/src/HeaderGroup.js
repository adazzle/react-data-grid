const React               = require('react');
const ReactDOM            = require('react-dom');
const joinClasses         = require('classnames');
const ColumnMetrics       = require('./ColumnMetrics');
const HeaderGroupRow      = require('./HeaderGroupRow');
const getScrollbarSize    = require('./getScrollbarSize');
import PropTypes from 'prop-types';
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-header.css');

type Group = {
  width: number
}

// The list of the propTypes that we want to include in the Header div
const knownDivPropertyKeys = ['height', 'onScroll'];

class HeaderGroup extends React.Component {
  static propTypes = {
    columnMetrics: PropTypes.shape({  width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    groupMetrics: PropTypes.array.isRequired,
    headerRows: PropTypes.array.isRequired,
  };

  state: {resizing: any} = {resizing: null};

  componentWillReceiveProps() {
    this.setState({resizing: null});
  }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    let update =  !(ColumnMetrics.sameColumns(this.props.groupMetrics.groups, nextProps.groupMetrics.groups, ColumnMetrics.sameColumn))
    || this.props.totalWidth !== nextProps.totalWidth
    || (this.props.headerRows.length !== nextProps.headerRows.length)
    || (this.state.resizing !== nextState.resizing);
    return update;
  }

  getHeaderRows = (): Array<HeaderRow> => {
    let groupMetrics = this.props.groupMetrics;
    let resizeColumn;
    if (this.state.resizing) {
      resizeColumn = this.state.resizing.column;
    }
    let headerRows = [];
    this.props.headerRows.forEach((row, index) => {
      // To allow header filters to be visible
      let rowHeight = 'auto';
      if (row.rowType === 'filter') {
        rowHeight = '500px';
      }
      let scrollbarSize = getScrollbarSize() > 0 ? getScrollbarSize() : 0;
      let updatedWidth = isNaN(this.props.totalWidth - scrollbarSize) ? this.props.totalWidth : this.props.totalWidth - scrollbarSize;
      let headerRowStyle = {
        position: 'absolute',
        top: this.getCombinedHeaderHeights(index),
        left: 0,
        width: updatedWidth,
        overflowX: 'hidden',
        minHeight: rowHeight
      };

      headerRows.push(<HeaderGroupRow
        key={row.ref}
        ref={(node) => { return row.rowType === 'filter' ? this.filterRow = node : this.row = node; }}
        rowType={row.rowType}
        style={headerRowStyle}
        width={groupMetrics.width}
        height={row.height || this.props.height}
        groups={this.props.groupMetrics.groups}
        resizing={resizeColumn}
        onFilterChange={row.onFilterChange}
        />);
    });
    return headerRows;
  };

  getCombinedHeaderHeights = (until: ?number): number => {
    let stopAt = this.props.headerRows.length;
    if (typeof until !== 'undefined') {
      stopAt = until;
    }

    let height = 0;
    for (let index = 0; index < stopAt; index++) {
      height += this.props.headerRows[index].height || this.props.height;
    }
    return height;
  };

  getStyle = (): {position: string; height: number} => {
    return {
      position: 'relative',
      height: this.getCombinedHeaderHeights()
    };
  };

  setScrollLeft = (scrollLeft: number) => {
    let node = ReactDOM.findDOMNode(this.row);
    node.scrollLeft = scrollLeft;
    this.row.setScrollLeft(scrollLeft);
    if (this.filterRow) {
      let nodeFilters = ReactDOM.findDOMNode(this.filterRow);
      nodeFilters.scrollLeft = scrollLeft;
      this.filterRow.setScrollLeft(scrollLeft);
    }
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

  // Set the cell selection to -1 x -1 when clicking on the header
  onHeaderClick = () => {
    this.props.cellMetaData.onCellClick({rowIdx: -1, idx: -1 });
  };

  render(): ?ReactElement {
    let className = joinClasses({
      'react-grid-Header': true,
      'react-grid-Header--resizing': !!this.state.resizing
    });
    let headerRows = this.getHeaderRows();

    return (
      <div {...this.getKnownDivProps()} style={this.getStyle()} className={className} onClick={this.onHeaderClick}>
        {headerRows}
      </div>
    );
  }
}

module.exports = HeaderGroup;
