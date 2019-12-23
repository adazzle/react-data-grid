import React from 'react';
import PropTypes from 'prop-types';
import { Column } from '../../../../src';

interface Option {
  id: string;
  title: string;
  value: string;
  text: string;
}

interface DropDownEditorProps<TRow> {
  column: Column<TRow>;
  options: Array<Option | string>;
  value?: string;
  onBlur(): void;
}

export default class DropDownEditor<TRow> extends React.Component<DropDownEditorProps<TRow>> {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string,
        text: PropTypes.string
      })
    ])).isRequired,
    value: PropTypes.any.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  selectRef: React.RefObject<HTMLSelectElement> = React.createRef();

  getInputNode() {
    return this.selectRef?.current;
  }

  getValue() {
    return {
      [this.props.column.key]: this.selectRef?.current?.value
    };
  }

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
        ref={this.selectRef}
        className="rdg-select-editor"
        defaultValue={this.props.value}
        onBlur={this.props.onBlur}
      >
        {this.renderOptions()}
      </select>
    );
  }
}
