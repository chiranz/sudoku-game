import React, { Component } from "react";

export class Result extends Component {
  render() {
    const { sudoku } = this.props;
    const elapsed = Math.floor(
      (sudoku.solveTime.getTime() - sudoku.startTime.getTime()) / 1000
    );

    return (
      <div>
        <h2>Your solved the sudoku in {elapsed} seconds. </h2>
        <p>
          Challenge your friend
          <a href={sudoku.shareUrl}>Share Link</a>
        </p>
      </div>
    );
  }
}

export default Result;
