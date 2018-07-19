const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

const RenderWindow = ({ isScrolling, colOverscanEndIdx, colOverscanStartIdx }) => {
  const width = (colOverscanEndIdx - colOverscanStartIdx) * 200;
  return (isScrolling ? <div 
    style={{ position: 'absolute', backgroundColor: 'orange', opacity: 0.7, height: 400, width: width, zIndex: 2, pointerEvents: 'none' }} >
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
        width: 200
      };
    });

    this.state = null;
  }

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        col1: 1,
        count: i * 1000
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  onScroll = (scrollParams) => {
    console.log(scrollParams);
    this.setState(scrollParams);
  };

  render() {
    return (
      <div style={{ marginLeft: '25%' }}>
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
