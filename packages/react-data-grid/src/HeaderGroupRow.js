const React             = require('react');
const createReactClass = require('create-react-class');
const shallowEqual    = require('fbjs/lib/shallowEqual');
const HeaderGroupCell        = require('./HeaderGroupCell');
const getScrollbarSize  = require('./getScrollbarSize');
const ExcelColumn  = require('./PropTypeShapes/ExcelColumn');
const ColumnUtilsMixin  = require('./ColumnUtils');
const SortableHeaderCell    = require('./cells/headerCells/SortableHeaderCell');
const FilterableHeaderCell  = require('./cells/headerCells/FilterableHeaderCell');
const HeaderCellType = require('./HeaderCellType');
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-header.css');

import PropTypes from 'prop-types';

const HeaderRowStyle  = {
  overflow: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  position: PropTypes.string
};

// The list of the propTypes that we want to include in the HeaderRow div
const knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

const HeaderGroupRow = createReactClass({
  displayName: 'HeaderGroupRow',

  propTypes: {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    style: PropTypes.shape(HeaderRowStyle),
    onScroll: PropTypes.func,
    rowType: PropTypes.string,
    draggableHeaderCell: PropTypes.func,
    onHeaderDrop: PropTypes.func
  },

  mixins: [ColumnUtilsMixin],

  componentWillMount() {
    this.cells = [];
  },

  shouldComponentUpdate(nextProps: {width: ?(number | string); height: number; columns: Array<ExcelColumn>; style: ?HeaderRowStyle; }): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
    );
  },

  getStyle(): HeaderRowStyle {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  },

  getCells(): Array<HeaderGroupCell> {
    let cells = [];
    let lockedCells = [];
    for (let i = 0, len = this.getSize(this.props.groups); i < len; i++) {
      let group = this.props.groups.get(i);
      let cell = (
        <HeaderGroupCell
          ref={(node) => this.cells[i] = node}
          key={i}
          height={this.props.height}
          group={group}
          onHeaderDrop={this.props.onHeaderDrop}
          />
      );
      if (group.get('locked')) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(lockedCells);
  },

  setScrollLeft(scrollLeft: number) {
    this.props.groups.forEach( (group, i) => {
      if (group.get('locked')) {
        this.cells[i].setScrollLeft(scrollLeft);
      } else {
        if (this.cells[i] && this.cells[i].removeScroll) {
          this.cells[i].removeScroll();
        }
      }
    });
  },

  getKnownDivProps() {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  },

  render(): ?ReactElement {
    let cellsStyle = {
      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      overflowY: 'hidden'
    };

    let cells = this.getCells();
    return (
      <div {...this.getKnownDivProps()} className="react-grid-HeaderRow">
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  }
});

module.exports = HeaderGroupRow;
