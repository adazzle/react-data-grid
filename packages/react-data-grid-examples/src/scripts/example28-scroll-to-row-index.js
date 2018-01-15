const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' } ];

    this.state = {
      value: 10,
      scrollToRowIndex: 10
    };
  }

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return (
      <div>
        <div style={{display: 'flex', marginBottom: '10px', alignItems: 'center'}}>
          <span style={{marginRight: '10px'}}>Row Index: </span>
          <input
            style={{marginRight: '10px', border: '1px outset lightgray', padding: '3px'}}
            type='text'
            value={this.state.value}
            onChange={(event) => { this.setState({value: event.target.value})}} />
          <button
            style={{padding: '5px'}}
            onClick={() => this.setState({scrollToRowIndex: this.state.value})}>Scroll to row</button>
        </div>
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this._rows.length}
          minHeight={500}
          scrollToRowIndex={+this.state.scrollToRowIndex} />
      </div>);
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Programmatic Scrolling Example',
  exampleDescription: <p>To programmatically set the vertical scrolling offset, specify the <code>scrollToRowIndex</code> property.</p>,
  examplePath: './scripts/example27-scroll-to-row-index.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
