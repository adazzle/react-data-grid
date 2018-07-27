const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

const COL_WIDTH = 200;
const ROW_HEIGHT = 35;
const HEADER_HEIGHT = 35;

const createColumns = (numberCols) => [...Array(numberCols).keys()].map(i => {
  if (i<3) {
    return {
      key: `col${i}`,
      name: `col${i}`,
      width: COL_WIDTH,
      locked: true
    }
  }
  return {
    key: `col${i}`,
    name: `col${i}`,
    width: COL_WIDTH
  }
});

const createRows = (numberRows) => [...Array(numberRows).keys()].map(i => {
  return [...Array(100).keys()].reduce((row, j) => ({...row, ...{[`col${j}`]: `row ${i} col ${j}`} }), {});
});



const RenderWindow = ({ isScrolling, colOverscanEndIdx, colOverscanStartIdx, rowOverscanEndIdx, rowOverscanStartIdx, rowVisibleStartIdx, rowVisibleEndIdx, colVisibleStartIdx, colVisibleEndIdx  }) => {
  const topOffset = (rowOverscanStartIdx - rowVisibleStartIdx) * ROW_HEIGHT;
  const marginTop = HEADER_HEIGHT + topOffset;
  const marginLeft = (colOverscanStartIdx - colVisibleStartIdx) * COL_WIDTH;
  const height = (rowOverscanEndIdx - rowOverscanStartIdx) * ROW_HEIGHT;
  const width = (colOverscanEndIdx - colOverscanStartIdx) * COL_WIDTH;
  return (isScrolling ? <div 
    style={{ position: 'absolute', backgroundColor: 'orange', opacity: 0.7, height, width, marginTop, marginLeft, zIndex: 2, pointerEvents: 'none' }} >
    </div> : null);
}

const NumberInput = ({name, value, onChange}) => {
  return (
  <div className="col-md-2">
  <div className="input-group">
  <span className="input-group-addon" id="basic-addon1">{name}</span>
  <input type="text" className="form-control" defaultValue={value} onChange={onChange}  />
</div></div>);
}

const GridHeightInput = ({value, onChange}) => {
  return (<NumberInput name="Height" value={value} onChange={onChange}/>);
}

const GridWidthInput = ({value, onChange}) => {
  return (<NumberInput name="Width" value={value} onChange={onChange}/>);
}

const NumberOfColumns = ({value, onChange}) => {
  return (<NumberInput name="No. Columns" value={value} onChange={onChange}/>);
}

const NumberOfRows = ({value, onChange}) => {
  return (<NumberInput name="No. Rows" value={value} onChange={onChange}/>);
}

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {columns: createColumns(100), rows: createRows(1000), gridWidth: 1200, gridHeight: 400};
  }

  setColumns = (e) => {
    this.setState({columns: createColumns(parseFloat(e.target.value))});
  }

  setRows = (e) => {
    this.setState({rows: createRows(parseFloat(e.target.value))});
  }

  setHeight = (e) => {
    this.setState({height: parseFloat(e.target.value)})
  }

  setWidth = (e) => {
    this.setState({width: parseFloat(e.target.value)})
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  clearScrollTimer = () => {
    if (this.resetScrollStateTimeoutId) {
      clearTimeout(this.resetScrollStateTimeoutId);
    }
  };

  resetScrollStateAfterDelay = () => {
    this.clearScrollTimer();
    this.resetScrollStateTimeoutId = setTimeout(
      this.resetScrollStateAfterDelayCallback,
      500
    );
  };

  resetScrollStateAfterDelayCallback = () => {
    this.resetScrollStateTimeoutId = null;
    this.setState({
      isScrolling: false
    });
  };

  onScroll = (scrollParams) => {
    this.resetScrollStateAfterDelay();
    console.log(scrollParams);
    this.setState(scrollParams);
  };

  render() {
    return (
      <div>
      <div className="row" >
      <NumberOfColumns onChange={this.setColumns} value={this.state.columns.length}/>
      <NumberOfRows onChange={this.setRows} value={this.state.rows.length}/>
      <GridWidthInput value={this.state.gridWidth} onChange={this.setGridWidth}/>
      <GridHeightInput  value={this.state.gridHeight} onChange={this.setGridHeight}/>
    </div>
      <div >
        <RenderWindow {...this.state} />
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={this.state.gridHeight}
          onScroll={this.onScroll}
        /></div></div>);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Efficient windowing demonstration',
  exampleDescription: 'Scroll the grid in different directions to see how efficient invisible content is rendered in order to achieve smooth scrolling',
  examplePath: './scripts/example30-efficient-windowing.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
