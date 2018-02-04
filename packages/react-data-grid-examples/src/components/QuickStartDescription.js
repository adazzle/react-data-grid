import React from 'react';
import PropTypes from 'prop-types';

const RowsDescription = require('./RowsDescription');
const ColsDescription = require('./ColsDescription');

class QuickStartDescription extends React.Component {
  render() {
    return (
      <div>
        <h3 id="js-basic-example">{this.props.title}</h3>
        <p>The most basic implementation of ReactDataGrid requires 4 properties; an array of columns, a rowGetter function to retrive a row for a given index, the number of rows the grid expects and the minimum height of the grid.</p>

        <ColsDescription />
        <RowsDescription />

        <p>Now simply invoke ReactDOM.render(..) passing the array of rows and columns as props</p>
        <div className="code-block js">
          <pre><code className="javascript">{"ReactDOM.render(<ReactDataGrid columns={columns} rowGetter={rowGetter} rowsCount={rowsCount()} minHeight={500} />, document.getElementById('example'))"}</code></pre>
        </div>
      </div>
    );
  }
}

QuickStartDescription.propTypes = {
  title: PropTypes.string
};

module.exports = QuickStartDescription;
