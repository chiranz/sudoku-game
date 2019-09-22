import React, { Component } from "react";
import SudokuBoard from "./components/SudokuBoard";
import produce from "immer";
import { checkSolution, generateSudoku, shareUrl } from "./lib/sudoku";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }
  handleChange = field => {
    this.setState(
      produce(state => {
        state.sudoku.rows[field.row].cols[field.col].value = field.value;
        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);
          if (solved) {
            const solvedTime = new Date();
            state.sudoku.solveTime = solvedTime;
            state.sudoku.challengersSolvedTime = this.solveSudoku;
            state.sudoku.shareUrl = shareUrl(state.sudoku);
          }
        }
      })
    );
  };
  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            if (!col.readOnly) {
              col.value = state.sudoku.solution[col.row * 9 + col.col];
            }
          })
        );
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SUDOKU CHALLANGE</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
        <button onClick={this.solveSudoku}>Solve it magically!</button>
      </div>
    );
  }
}

export default App;
