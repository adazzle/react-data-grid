import faker from 'faker';
import React from 'react';
import DataGrid from 'react-data-grid';
import { Data, Formatters } from 'react-data-grid-addons';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DraggableHeaderCell from './components/draggable/DraggableHeaderCell';
import GroupedColumnsPanel from './components/group/GroupedColumnsPanel';
import Wrapper from './Wrapper';

const { Selectors } = Data;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

function createFakeRowObjectData(index) {
  return {
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
  };
}

function createRows(numberOfRows) {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }
  return rows;
}

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

export default class extends React.Component {
  state = { rows: createRows(2000), groupBy: [], expandedRows: {} };

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
        <DndProvider backend={HTML5Backend}>
          <div className="react-grid-Toolbar">
            <GroupedColumnsPanel
              groupBy={this.state.groupBy}
              onColumnGroupAdded={this.onColumnGroupAdded}
              onColumnGroupDeleted={this.onColumnGroupDeleted}
            />
          </div>
          <DataGrid
            ref={node => this.grid = node}
            enableCellSelect
            columns={columns}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onRowExpandToggle={this.onRowExpandToggle}
            rowHeight={50}
            minHeight={600}
            draggableHeaderCell={DraggableHeaderCell}
          />
        </DndProvider>
      </Wrapper>
    );
  }
}
