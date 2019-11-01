import React from 'react';
import PropTypes from 'prop-types';

export default class DropDownEditor extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string
      })
    ])).isRequired
  };

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    onCommit: PropTypes.func
  };

  getInputNode() {
    return this.select;
  }

  getValue() {
    return {
      [this.props.column.key]: this.select.value
    };
  }

  setSelectRef = (select) => {
    this.select = select;
  };

  renderOptions() {
    return this.props.options.map(name => {
      if (typeof name === 'string') {
        return (
          <option
            key={name}
            value={name}
          >
            {name}
          </option>
        );
      }

      return (
        <option
          key={name.id}
          value={name.value}
          title={name.title}
        >
          {name.text || name.value}
        </option>
      );
    });
  }

  render() {
    return (
      <select
        ref={this.setSelectRef}
        className="rdg-select-editor"
        defaultValue={this.props.value}
        onBlur={() => this.props.onCommit()}
      >
        {this.renderOptions()}
      </select>
    );
  }
}
