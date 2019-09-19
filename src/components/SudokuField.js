import React, { Component } from "react";

export class SudokuField extends Component {
  handleChange = e => {
    const rawValue = e.target.value;
    const value = rawValue === "" ? null : parseInt(rawValue, 10);
    this.props.onChange({ ...this.props.field, value: value });
  };
  render() {
    const { field } = this.props;
    return (
      <input
        className="field"
        value={field.value ? field.value : ""}
        readOnly={field.readOnly}
        onChange={this.handleChange}
      />
    );
  }
}

export default SudokuField;
