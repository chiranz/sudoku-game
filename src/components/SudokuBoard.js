import React, { Component } from "react";
import SudokuField from "./SudokuField";

export class SudokuBoard extends Component {
  render() {
    const { sudoku } = this.props;
    return (
      <div>
        {sudoku.rows.map(row => (
          <div className="row" key={row.index}>
            {row.cols.map(field => (
              <SudokuField field={field} key={field.col} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default SudokuBoard;
