const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID'
      },
      {
        key: 'title',
        name: 'Title'
      },
      {
        key: 'count',
        name: 'Count'
      }
    ];

    this.state = { rows: this.createRows(1000) };
  }

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000,
        isSelected: false
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onStart = (selectedRange) => {
    this.textarea.value += 'START: ' +
      `(${selectedRange.topLeft.idx}, ${selectedRange.topLeft.rowIdx}) -> ` +
      `(${selectedRange.bottomRight.idx}, ${selectedRange.bottomRight.rowIdx})\n`;
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  onUpdate = (selectedRange) => {
    this.textarea.value += 'UPDATE: ' +
      `(${selectedRange.topLeft.idx}, ${selectedRange.topLeft.rowIdx}) -> ` +
      `(${selectedRange.bottomRight.idx}, ${selectedRange.bottomRight.rowIdx})\n`;
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  onComplete = () => {
    this.textarea.value += 'END\n';
    this.textarea.scrollTop = this.textarea.scrollHeight;
  };

  render() {
    return  (
      <div>
        <textarea
          ref={(element) => this.textarea = element}
          style={{width: '100%', marginBottom: '1em', padding: '0.5em', border: '1px solid black' }}
          rows={5}
        />
        <ReactDataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          cellRangeSelection={{
            onStart: this.onStart,
            onUpdate: this.onUpdate,
            onComplete: this.onComplete
          }}
        />
      </div>
    );
  }
}

const exampleDescription = (
  <div>
    <h4>cellRangeSelection.onStart</h4>
    <p>Called on mousedown on a cell. Receives <code>selectedRange</code> (containing <code>topLeft</code> and <code>topRight</code>) as an argument.</p>
    <h4>cellRangeSelection.onUpdate</h4>
    <p>Called on mouseover on a cell when dragging with the mouse, or when pressing shift+arrowkey. Receives <code>selectedRange</code> (containing <code>topLeft</code> and <code>topRight</code>) as an argument.</p>
    <h4>cellRangeSelection.onComplete</h4>
    <p>Called on mouseup (anywhere) when dragging with the mouse, or when pressing shift+arrowkey.</p>
    <p>Note: altering the selected range with shift+arrowkey will fire both an Updated and Completed event with each keystroke.</p>
    <h4>Example</h4>
    <p>The example below uses these events to record a log of selection range activity (via both cursor and keyboard) into the textarea.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Selection Range Events',
  exampleDescription,
  examplePath: './scripts/example30-selection-range-events.js'
  // TODO: add examplePlaygroundLink (once selection ranges are supported in the published version of RDG, so available in JSFiddle)
});
