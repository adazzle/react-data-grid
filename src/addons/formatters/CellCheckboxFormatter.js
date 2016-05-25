const React = require('react');

class CellCheckboxFormatter extends React.Component {

  render(): ? ReactElement {
    let checked = this.props.value !== null ? this.props.value : false;
    return <div><input type="checkbox" defaultChecked={checked} readOnly={true}/></div>;
  }
}

CellCheckboxFormatter.propTypes = {
  value: React.PropTypes.bool
};

module.exports = CellCheckboxFormatter;
