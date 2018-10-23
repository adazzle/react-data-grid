const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Formatters } = require('react-data-grid-addons');
import update from 'immutability-helper';

const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

// options for priorities autocomplete editor
const priorities = [{ id: 0, title: 'Critical' }, { id: 1, title: 'High' }, { id: 2, title: 'Medium' }, { id: 3, title: 'Low'} ];
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />;

// options for IssueType dropdown editor
// these can either be an array of strings, or an object that matches the schema below.
const issueTypes = [
  { id: 'bug', value: 'bug', text: 'Bug', title: 'Bug' },
  { id: 'improvement', value: 'improvement', text: 'Improvement', title: 'Improvement' },
  { id: 'epic', value: 'epic', text: 'Epic', title: 'Epic' },
  { id: 'story', value: 'story', text: 'Story', title: 'Story' }
];
const IssueTypesEditor = <DropDownEditor options={issueTypes}/>;

const IssueTypesFormatter = <DropDownFormatter options={issueTypes} value="bug"/>;

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'task',
        name: 'Title',
        editable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        editor: PrioritiesEditor
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        editor: IssueTypesEditor,
        formatter: IssueTypesFormatter
      }
    ];

    this.state = { rows: this.createRows(1000) };
  }

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      });
    }

    return rows;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  render() {
    return (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated} />);
  }
}

const exampleDescription = (
  <p>This example uses the built in <strong>Autocomplete</strong> editor for the priorities column and the <strong>DropdownEditor</strong> for the IssueType column. <strong>You must include the <code>react-data-grid.ui-plugins.js</code> package to use the built in editors.</strong></p>);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Built-In Cell Editor Example',
  exampleDescription,
  examplePath: './scripts/example06-built-in-editors.js',
  examplePlaygroundLink: undefined
});
