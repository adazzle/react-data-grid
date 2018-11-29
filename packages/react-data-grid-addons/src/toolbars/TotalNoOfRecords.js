import React from 'react';
import PropTypes from 'prop-types';
import './TotalNoOfRecordsStyles.css'

class TotalNoOfRecords extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let resultText;
        let noOfRecords = isNaN(this.props.noOfRecords) ? 0 : this.props.noOfRecords;
        if (noOfRecords !== 1) {
            resultText = noOfRecords + ' ' + 'Results';
        } else {
            resultText = noOfRecords + ' ' + 'Result';
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