import React, { Component } from "react";

export class Result extends Component {
  render() {
    const { sudoku } = this.props;
    const elapsed = Math.floor(
      (sudoku.solveTime.getTime() - sudoku.startTime.getTime()) / 1000
    );
    return <h2>Your solved the sudoku in {elapsed} seconds.</h2>;
  }
}

export default Result;
