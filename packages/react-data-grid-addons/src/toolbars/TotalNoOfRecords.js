import React from 'react';
import PropTypes from 'prop-types';
import './TotalNoOfRecordsStyles.css'

class TotalNoOfRecords extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let resultText;
        this.props.noOfRecords = isNaN(this.props.noOfRecords) ? 0 : this.props.noOfRecords;
        if (this.props.noOfRecords !== 1) {
            resultText = this.props.noOfRecords + ' ' + 'Results';
        } else {
            resultText = this.props.noOfRecords + ' ' + 'Result';
        }
        return (
            <span className="total-no-of-records">
                <span>{resultText}</span>
                <span className="additional-text">{this.props.additionalText}</span>
            </span>
        )
    }
}

TotalNoOfRecords.propTypes = {
    noOfRecords: PropTypes.string,
    additionalText: PropTypes.string
  };

export default TotalNoOfRecords;