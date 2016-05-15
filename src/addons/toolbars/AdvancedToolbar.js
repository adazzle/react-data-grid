import React, {Component} from 'react';
import GroupedColumnsPanel from 'GroupedColumnsPanel';

const propTypes = {

};

const defaultProps = {
  enableAddRow: true
};

class AdvancedToolbar extends Component {
  render() {
    return (
      <div className="react-grid-Toolbar">
        <GroupedColumnsPanel/>
        <div className="tools">

        </div>
      </div>);
  }
}

AdvancedToolbar.defaultProps = defaultProps;
AdvancedToolbar.propTypes = propTypes;

export default AdvancedToolbar;
