import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from 'react-data-grid';
import { ToolsPanel, Data, Draggable, Formatters } from 'react-data-grid-addons';
import faker from 'faker';
import Wrapper from './Wrapper';

const { AdvancedToolbar: Toolbar, GroupedColumnsPanel } = ToolsPanel;
const { Selectors } = Data;
const { Container: DraggableContainer } = Draggable;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const createFakeRowObjectData = (index) => ({
  id: `id_${index}`,
  avatar: faker.image.avatar(),
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
  const rows = [];
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
    key: 'avatar',
    name: 'Avatar',
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
    return (
      <Toolbar>
        <GroupedColumnsPanel groupBy={this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted} />
      </Toolbar>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    const fakeRows = createRows(2000);
    this.state = { rows: fakeRows, groupBy: [], expandedRows: {} };
  }

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getRowAt = (index) => {
    const rows = this.getRows();
    return rows[index];
  };

  getSize = () => {
    return this.getRows().length;
  };

  onColumnGroupAdded = (colName) => {
    const columnGroups = this.state.groupBy.slice(0);
    const activeColumn = columns.find((c) => c.key === colName);
    const isNotInGroups = columnGroups.find((c) => activeColumn.key === c.name) == null;
    if (isNotInGroups) {
      columnGroups.push({ key: activeColumn.key, name: activeColumn.name });
    }

    this.setState({ groupBy: columnGroups });
  };

  onColumnGroupDeleted = (name) => {
    const columnGroups = this.state.groupBy.filter(function(g) {
      return typeof g === 'string' ? g !== name : g.key !== name;
    });
    this.setState({ groupBy: columnGroups });
  };

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    const expandedRows = { ...this.state.expandedRows };
    expandedRows[columnGroupName] = { ...expandedRows[columnGroupName] };
    expandedRows[columnGroupName][name] = { isExpanded: shouldExpand };
    this.setState({ expandedRows });
  };

  render() {
    return (
      <Wrapper title="Row Grouping Example">
        <DraggableContainer>
          <CustomToolbar
            groupBy={this.state.groupBy}
            onColumnGroupAdded={this.onColumnGroupAdded}
            onColumnGroupDeleted={this.onColumnGroupDeleted}
          />
        </DraggableContainer>
        <DraggableContainer>
          <DataGrid
            ref={node => this.grid = node}
            enableCellSelect
            columns={columns}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onRowExpandToggle={this.onRowExpandToggle}
            rowHeight={50}
            minHeight={600}
          />
        </DraggableContainer>
      </Wrapper>
    );
  }
}
