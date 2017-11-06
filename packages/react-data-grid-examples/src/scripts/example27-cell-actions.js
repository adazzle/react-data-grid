const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const {
  ToolsPanel: { AdvancedToolbar: Toolbar, GroupedColumnsPanel },
  Data: { Selectors },
  Draggable: { Container: DraggableContainer },
  Formatters: { ImageFormatter }
} = require('react-data-grid-addons');

import PropTypes from 'prop-types';

faker.locale = 'en_GB';

const createFakeRowObjectData = (index) => ({
  id: 'id_' + index,
  avartar: faker.image.avatar(),
  county: faker.address.county(),
  email: faker.internet.email(),
  title: faker.name.prefix(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  street: faker.address.streetName(),
  zipCode: faker.address.zipCode(),
  date: faker.date.past().toLocaleDateString(),
  bs: faker.company.bs(),
  catchPhrase: faker.company.catchPhrase(),
  companyName: faker.company.companyName(),
  words: faker.lorem.words(),
  sentence: faker.lorem.sentence()
});

const createRows = (numberOfRows) => {
  let rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }
  return rows;
};

const columns = [
  {
    key: 'id',
    name: 'ID',
    width: 80,
    resizable: true
  },
  {
    key: 'avartar',
    name: 'Avartar',
    width: 60,
    formatter: ImageFormatter,
    draggable: true
  },
  {
    key: 'county',
    name: 'County',
    width: 200,
    draggable: true
  },
  {
    key: 'title',
    name: 'Title',
    width: 200,
    draggable: true
  },
  {
    key: 'firstName',
    name: 'First Name',
    width: 200,
    draggable: true
  },
  {
    key: 'lastName',
    name: 'Last Name',
    width: 200,
    draggable: true
  },
  {
    key: 'email',
    name: 'Email',
    width: 200,
    draggable: true
  },
  {
    key: 'street',
    name: 'Street',
    width: 200,
    draggable: true
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    width: 200,
    draggable: true
  },
  {
    key: 'date',
    name: 'Date',
    width: 200,
    draggable: true
  },
  {
    key: 'bs',
    name: 'bs',
    draggable: true,
    width: 200
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    width: 200,
    draggable: true
  },
  {
    key: 'companyName',
    name: 'Company Name',
    width: 200,
    draggable: true
  },
  {
    key: 'sentence',
    name: 'Sentence',
    width: 200,
    draggable: true
  }
];

class CustomToolbar extends React.Component {
  static propTypes = {
    groupBy: PropTypes.array.isRequired,
    onColumnGroupAdded: PropTypes.func.isRequired,
    onColumnGroupDeleted: PropTypes.func.isRequired
  };

  render() {
    return (<Toolbar>
      <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted}/>
      </Toolbar>);
  }
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    let fakeRows = createRows(2000);
    this.state = {rows: fakeRows, groupBy: [], expandedRows: {}};
  }

  getRows = () => {
    let rows = Selectors.getRows(this.state);
    return rows;
  };

  getRowAt = (index) => {
    let rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.getRows().length;
  };

  onColumnGroupAdded = (colName) => {
    let columnGroups = this.state.groupBy.slice(0);
    let activeColumn = columns.find((c) => c.key === colName)
    let isNotInGroups = columnGroups.find((c) => activeColumn.key === c.name) == null;
    if (isNotInGroups) {
      columnGroups.push({key: activeColumn.key, name: activeColumn.name});
    }

    this.setState({groupBy: columnGroups});
  };

  onColumnGroupDeleted = (name) => {
    let columnGroups = this.state.groupBy.filter(function(g){
      return typeof g === 'string' ? g !== name : g.key !== name;
    });
    this.setState({groupBy: columnGroups});
  };

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
    expandedRows[columnGroupName][name] = {isExpanded: shouldExpand};
    this.setState({expandedRows: expandedRows});
  };

  getCellActions(column, row) {
    if (column.key === 'county' && row.id === 'id_0') {
      return [
        {
          icon: 'glyphicon glyphicon-remove',
          callback: () => { alert('Deleting'); }
        },
        {
          icon: 'glyphicon glyphicon-link',
          actions: [
            {
              text: 'Campaign Linking',
              callback: () => { alert('Navigating to camapign linking'); }
            }
          ]
        }
      ];
    }
  }

  render() {
    return (
      <DraggableContainer>
          <ReactDataGrid
            ref={ node => this.grid = node }
            enableCellSelect={true}
            enableDragAndDrop={true}
            columns={columns}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onRowExpandToggle={this.onRowExpandToggle}
            toolbar={<CustomToolbar groupBy={this.state.groupBy} onColumnGroupAdded={this.onColumnGroupAdded} onColumnGroupDeleted={this.onColumnGroupDeleted}/>}
            rowHeight={50}
            minHeight={600}
            getCellActions={this.getCellActions} />
      </DraggableContainer>
    );
  }
}

const exampleDescription = (
  <div>
    <p>This example demonstrates how one can add on custom actions to the cells of any column and row.</p>
    <p>This feature was designed in such a way that one can decide which combination of row/columns should have actions on them.</p>
    <p>To use the cell action simply create a function called <code>getCellActions</code> which will be passed to your react data grid instance</p>
    <p>The function is called by react data grid for each cell with a column and row object, you can then create any condition you deem fit and return an array of objects to be rendered</p>
    <p><code>{"[{actionIcon, actionCallback}]"}</code> will render an action button</p>
    <p><code>{"[{actionIcon, actions: [{actionIcon, actionText, actionCallback}]}]"}</code> will render an action menu with the button opening a dropdown of actions</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Cell Actions Example',
  exampleDescription,
  examplePath: './scripts/example27-cell-actions.js',
  examplePlaygroundLink: undefined
});
