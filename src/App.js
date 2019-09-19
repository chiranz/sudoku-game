import React, { Component } from "react";
import SudokuBoard from "./components/SudokuBoard";
import generator from "sudoku";
import produce from "immer";
import "./App.css";

window.generator = generator;
/*
Generates a sudoku with a structure

{rows: [{index: 0, cols: [{row: 0, col: 0, value: val, readOnly: Bool}...]}...]}

*/
function generateSudoku() {
  const raw = generator.makepuzzle();
  const rawSolution = generator.solvepuzzle(raw);
  const formattedSolution = rawSolution.map(value => value + 1);

  const result = {
    rows: [],
    solution: formattedSolution,
    startTime: new Date(),
    solvedTime: null
  };
  const formatted = raw.map(value => (value ? value + 1 : null));
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = formatted[i * 9 + j];
      const col = {
        row: i,
        col: j,
        value: value,
        readOnly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  return result;
}

function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat();
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== sudoku.solution[i]) {
      return false;
    }
  }
  return true;
}

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
            state.sudoku.solveTime = new Date();
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
  handleSolving = state => {};

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
