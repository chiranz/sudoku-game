import React, { Component } from "react";

export class SudokuField extends Component {
  render() {
    const { field } = this.props;
    return (
      <input
        className="field"
        value={field.value ? field.value : undefined}
        readOnly={field.readOnly}
      />
    );
  }
}

export default SudokuField;
