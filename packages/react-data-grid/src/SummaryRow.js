import React, { Component } from 'react';
import BaseSummaryCell from './SummaryCell';
import createObjectWithProperties from './createObjectWithProperties';
import getScrollbarSize from './getScrollbarSize';

const knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

class SummaryRow extends Component {
  componentWillMount() {
    this.cells = [];
  }

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onColumnResize: PropTypes.func,
    onColumnResizeEnd: PropTypes.func,
    filterable: PropTypes.bool,
    onFilterChange: PropTypes.func,
    resizing: PropTypes.object,
    onScroll: PropTypes.func
  };

  shouldComponentUpdate(
    nextProps: {width: ?(number | string); height: number; columns: Array<ExcelColumn>; onColumnResize: ?any},
  ): boolean {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
    );
  }

  getStyle = () => {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  }

  getRenderer = (column) => {
    const Summary = column.summary;
    if (Summary) {
      return (
        <Summary {...this.props} column={column} />
      );
    }
    return <div />;
  }

  getCells = (): Array<BaseSummaryCell> => {
    const cells = [];
    const lockedCells = [];

    this.props.columns.forEach((column, idx) => {
      const renderer = this.getRenderer(column);

      const cell = (
        <BaseSummaryCell
          ref={(node) => this.cells[idx] = node}
          key={idx}
          height={this.props.height}
          column={column}
          renderer={renderer}
          resizing={this.props.resizing === column}
          onResize={this.props.onColumnResize}
          onResizeEnd={this.props.onColumnResizeEnd}
        />
      );
      if (column.locked) {
        lockedCells.push(cell);
      } else {
        cells.push(cell);
      }
    });
    return cells.concat(lockedCells);
  }

  setScrollLeft = (scrollLeft: number) => {
    this.props.columns.forEach( (column, i) => {
      if (column.locked) {
        this.cells[i].setScrollLeft(scrollLeft);
      } else {
        if (this.cells[i] && this.cells[i].removeScroll) {
          this.cells[i].removeScroll();
        }
      }
    });
  }

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

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
      <div
        {...this.getKnownDivProps()}
        className="react-grid-HeaderRow"
        onScroll={this.onScroll}
      >
        <div style={cellsStyle} >
          {cells}
        </div>
      </div>
    );
  }
}

export default SummaryRow;
