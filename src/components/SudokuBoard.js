import React, { Component } from "react";
import SudokuField from "./SudokuField";
import Timer from "./Timer";
import Result from "./Result";
export class SudokuBoard extends Component {
  render() {
    const { sudoku, onChange } = this.props;
    const opponentTime = sudoku.challengerSolveTime
      ? Math.floor(
          (sudoku.challengerSolvedTime.getTime() -
            sudoku.challengerStartTime.getTime()) /
            1000
        )
      : null;
    console.log(opponentTime);
    return (
      <div>
        {opponentTime && (
          <h3>Your opponent solved it in {opponentTime} seconds</h3>
        )}
        {!sudoku.solveTime && <Timer start={sudoku.startTime} />}
        {sudoku.solveTime && <Result sudoku={sudoku} />}
        {sudoku.rows.map(row => (
          <div className="row" key={row.index}>
            {row.cols.map(field => (
              <SudokuField field={field} key={field.col} onChange={onChange} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default SudokuBoard;
