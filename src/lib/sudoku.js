import generator from "sudoku";
/*
Generates a sudoku with a structure

{rows: [{index: 0, cols: [{row: 0, col: 0, value: val, readOnly: Bool}...]}...]}

*/
export function generateSudoku() {
  window.generator = generator;
  const fromUrl = extractUrlData();
  const raw = fromUrl ? fromUrl.raw : generator.makepuzzle();
  const rawSolution = generator.solvepuzzle(raw);
  const formattedSolution = rawSolution.map(value => value + 1);

  const result = {
    raw,
    rows: [],
    solution: formattedSolution,
    startTime: new Date(),
    solvedTime: null,
    challangerStartTime: fromUrl && fromUrl.startTime,
    challangerSolveTime: fromUrl && fromUrl.solvedTime
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
  console.log(result);
  return result;
}

export function checkSolution(sudoku) {
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

export function shareUrl(sudoku) {
  const data = {
    raw: sudoku.raw,
    startTime: sudoku.startTime,
    solvedTime: sudoku.solveTime
  };
  const query = btoa(JSON.stringify(data));
  return document.location.href.replace(/\?.+$/, "") + `?sudoku=${query}`;
}

export function extractUrlData() {
  const match = document.location.search.match(/sudoku=([^&]+)/);
  if (match) {
    console.log(JSON.stringify(JSON.parse(atob(match[1]))));
    return JSON.parse(atob(match[1]));
  }
  return null;
}
