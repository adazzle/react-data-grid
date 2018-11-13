import React from 'react';
import PropTypes from 'prop-types';
import './CheckBoxStyles.css';

class Checkbox extends React.Component {
    constructor(props){
        super(props);
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
        this.state = {isSelected: props.optionObj.isSelected};
        this.setSelectedValues();
    }

  toggleCheckboxChange = () => {
    this.props.optionObj.isSelected = !this.props.optionObj.isSelected;
    this.setState({isSelected: this.props.optionObj.isSelected})
    this.props.handleCheckboxChange(this.props.optionObj);
  }

  setSelectedValues(){
    if(this.props.optionObj.isSelected)
        this.props.setSelectedItems(this.props.optionObj);
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={this.props.optionObj.name}
            checked={this.props.optionObj.isSelected}
            onChange={this.toggleCheckboxChange}
          />
          <span className="checkBoxText">{this.props.optionObj.name}</span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  optionObj: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  setAllAsSelected: PropTypes.func.isRequired
};

export default Checkbox;