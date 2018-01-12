const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' },
    ];
    this._data = Array(1000);

    this.state = null;
  }

  rowGetter = (begin, end) => {
    const range = this._data.slice(begin, end);
    if (Object.keys(range).length === end - begin) {
      // take answer from the cache
      return range;
    }

    return new Promise((resolve, rej) => setTimeout(() => {
      // this could be an ajax request or something that needs some time
      const data = this._data;
      for (let i = begin; i < end; ++i) {
        // fill in missing elements
        if (data[i] === undefined) {
          data[i] = {
            id: i,
            title: 'Title ' + i,
            count: i * 1000,
          };
        }
      }

      resolve(data.slice(begin, end));
    }, 1500));
  }

  loadingView(props) {
    const style = {
      position: props.loading === undefined ? 'absolute' : 'sticky',
      backgroundColor: 'lightseagreen',
      height: '100%',
      width: props.width || '100%',
      top: 0,
      left: 0,
    };
    return (
      <div hidden={props.loading === false} style={style}>
        <div style={{position: 'absolute', top: '50%', left: '50%'}}>Loading ...</div>
      </div>
    );
  }

  render() {
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._data.length}
        loadingView={this.loadingView}
        minHeight={500} />
    );
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Example with dynamic data loading',
  exampleDescription: 'The currently visible content of the grid gets fetched upon viewing. Scroll up/down or jump to the end.',
  examplePath: './scripts/example28-dynamic-loading.js',
});
