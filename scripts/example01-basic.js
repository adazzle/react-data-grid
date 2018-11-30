const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];

const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

function HelloWorld() {
  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  rowsCount={3}
  minHeight={150} />);
}

module.exports = exampleWrapper({
  WrappedComponent: HelloWorld,
  exampleName: 'Basic Example',
  exampleDescription: 'A display only grid.',
  examplePath: './scripts/example01-basic.js',
  examplePlaygroundLink: 'https://jsfiddle.net/f6mbnb8z/1/'
});
