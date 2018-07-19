const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

const COL_WIDTH = 200;
const ROW_HEIGHT = 35;
const HEADER_HEIGHT = 35;

const RenderWindow = ({ isScrolling, colOverscanEndIdx, colOverscanStartIdx, rowOverscanEndIdx, rowOverscanStartIdx, rowVisibleStartIdx, rowVisibleEndIdx, colVisibleStartIdx, colVisibleEndIdx  }) => {
  console.log(rowVisibleEndIdx);
  const topOffset = (rowOverscanStartIdx - rowVisibleStartIdx) * ROW_HEIGHT;
  const marginTop = HEADER_HEIGHT + topOffset;
  const marginLeft = (colOverscanStartIdx - colVisibleStartIdx) * COL_WIDTH;
  const height = (rowOverscanEndIdx - rowOverscanStartIdx) * ROW_HEIGHT;
  const width = (colOverscanEndIdx - colOverscanStartIdx) * COL_WIDTH;
  return (isScrolling ? <div 
    style={{ position: 'absolute', backgroundColor: 'orange', opacity: 0.7, height, width, marginTop, marginLeft, zIndex: 2, pointerEvents: 'none' }} >
    </div> : null);
}

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [...Array(100).keys()].map(i => {
      return {
        key: `col${i}`,
        name: `col${i}`,
        width: COL_WIDTH
      }
    });

    this.state = null;
  }

  createRows = () => {
    this._rows = [...Array(1000).keys()].map(i => {
      return [...Array(100).keys()].reduce((row, j) => ({...row, ...{[`col${j}`]: `row ${i} col ${j}`} }), {});
    });
  };

  rowGetter = (i) => {
    return this._rows[i];
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
      <div style={{ marginLeft: '25%', marginTop: '5%' }}>
        <RenderWindow {...this.state} />
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minWidth={600}
          minHeight={400}
          onScroll={this.onScroll}
        /></div>);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Basic Example',
  exampleDescription: 'A display only grid.',
  examplePath: './scripts/example30-efficient-windowing.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
