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
            />
      </DraggableContainer>
    );
  }
}

const exampleDescription = (
  <div>
    <p>This example demonstrates how to group rows by column name. Drag a column header to group rows by that column.</p>
    <p>To expand and close a row group, you can use either the mouse or keyboard</p>
    <p>Press <strong>Enter</strong> or <strong>Left Arrow</strong> or <strong>Right Arrow</strong> to toggle whether a row is expanded or not</p>
    <p>This feature also supports a custom Renderer, by using a renderer you can render some fancy custom html in the row group.</p>
    <p>To use a renderer just inject your component with <code>rowGroupRenderer</code> prop in the grid.</p>
  </div>
);

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Row Grouping Example',
  exampleDescription,
  examplePath: './scripts/example21-grouping.js',
  examplePlaygroundLink: undefined
});
