import React from 'react';

import { Column } from 'react-data-grid';

interface Option {
  id: string;
  title?: string;
  value?: string;
  text?: string;
}

interface Props {
  value?: string | string[] | number;
  column: Column;
  options: (string | Option)[];
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
}

interface State {
  value?: string | string[] | number;
}

export default class DropDownEditor extends React.Component<Props, State> {
  private readonly select = React.createRef<HTMLSelectElement>();
  readonly state: Readonly<State> = { value: this.props.value };

  handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: e.target.value });
  };

  getInputNode() {
    return this.select.current;
  }

  getValue() {
    return {
      [this.props.column.key]: this.state.value
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
        ref={this.select}
        style={{ width: '100%' }}
        value={this.state.value}
        onChange={this.handleOnChange}
        onBlur={this.props.onBlur}
      >
        {this.renderOptions()}
      </select>
    );
  }
}
