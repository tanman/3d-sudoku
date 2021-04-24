let sudoku = require("sudoku");
let puzzle = sudoku.makepuzzle();
let solution = sudoku.solvepuzzle(puzzle);
let difficulty = sudoku.ratepuzzle(puzzle, 4);

let printPuzzle = (puzzle) => {
  let rowString = "";
  for (let x = 0; x < puzzle.length; x++) {
    let val = puzzle[x] ? puzzle[x] : "0";
    rowString += val;

    if ((x + 1) % 9 === 0) {
      rowString += "\n";
    }
  }
  console.log(rowString);
};

// GETTERS
/////////////////////////////////////////////////////
let getBlank = () => {
  let blank = [];
  for (let x = 0; x < 9 * 9; x++) {
    blank.push(null);
  }
  return blank;
};

let getSides = (puzzle) => {
  return {
    left: getLeft(puzzle),
    right: getRight(puzzle),
    top: getTop(puzzle),
    bottom: getBottom(puzzle),
  };
};

let getLeft = (puzzle) => {
  let left = [];
  for (let x = 0; x < puzzle.length; x += 9) {
    left[x / 9] = puzzle[x];
  }
  return left;
};

let getRight = (puzzle) => {
  let right = [];
  for (let x = 8; x < puzzle.length; x += 9) {
    right[Math.floor(x / 9)] = puzzle[x];
  }
  return right;
};

let getTop = (puzzle) => {
  let top = [];
  for (let x = 0; x < 9; x++) {
    top[x] = puzzle[x];
  }
  return top;
};

let getBottom = (puzzle) => {
  let bottom = [];
  for (let x = 72; x < 9 + 72; x++) {
    bottom[x - 72] = puzzle[x];
  }
  return bottom;
};
/////////////////////////////////////////////////////

// SETTERS
/////////////////////////////////////////////////////
let setLeft = (puzzle, col) => {
  let newPuzzle = puzzle;
  console.log(`set left received puzzle? ${!!puzzle}\nand col:\n${col}`);
  for (let x = 0; x < puzzle.length; x += 9) {
    if (x === 0 || x % 9 === 0) {
      newPuzzle[x] = col[x / 9];
    }
  }
  return newPuzzle;
};

let setRight = (puzzle, col) => {
  let newPuzzle = puzzle;
  for (let x = 8; x < puzzle.length; x += 9) {
    newPuzzle[x] = col[Math.floor(x / 9)];
  }
  return newPuzzle;
};

let setTop = (puzzle, col) => {
  let newPuzzle = puzzle;
  for (let x = 0; x < col.length; x++) {
    newPuzzle[x] = col[x];
  }
  return newPuzzle;
};

let setBottom = (puzzle, col) => {
  let newPuzzle = puzzle;
  for (let x = 72; x < col.length + 72; x++) {
    newPuzzle[x] = col[x - 72];
  }
  return newPuzzle;
};
/////////////////////////////////////////////////////

// TESTS
/////////////////////////////////////////////////////
// console.log("puzzle");
// puzzle = solution;
// printPuzzle(puzzle);
// console.log("left");
// console.log(getLeft(puzzle));
// console.log("right");
// console.log(getRight(puzzle));
// console.log("top");
// console.log(getTop(puzzle));
// console.log("bottom");
// console.log(getBottom(puzzle));
// console.log("blank");
// printPuzzle(getBlank())
// console.log("set left on a blank");
// let blankLeftSet = setLeft(getBlank(), getLeft(puzzle));
// printPuzzle(blankLeftSet);
// console.log("set right on that blank");
// let blankLeftRightSet = setRight(getBlank(), getLeft(puzzle));
// printPuzzle(blankLeftRightSet);
// console.log("set top on that blank");
// let blankLeftRightTopSet = setTop(getBlank(), getLeft(puzzle));
// printPuzzle(blankLeftRightTopSet);
// console.log("set bottom on that blank");
// let blankWithSidesSet = setBottom(getBlank(), getLeft(puzzle));
// printPuzzle(blankWithSidesSet);
// console.log("solved the original");
// printPuzzle(solution);
// console.log("solved that blank");
// printPuzzle(sudoku.solvepuzzle(blankLeftSet));
/////////////////////////////////////////////////////

// SETUP SCRIPT TRY 1
// Start with the front face, generate a sudoku
// match the right side of the front to the left
// side of the right face. Continue this to generate
// the four walls of the cube. The left side will need
// to line up with front left and back right.
// The top and bottom will need all 4 edges lined up.
/////////////////////////////////////////////////////
let front = {
  problem: puzzle,
  solution: solution,
};
front.solutionSides = getSides(front.solution);
// console.log(JSON.stringify(front.solutionSides, null, 2))

let right = {
  problem: null,
  solution: sudoku.solvepuzzle(setLeft(getBlank(), front.solutionSides.right)),
};
right.solutionSides = getSides(right.solution);

let back = {
  problem: null,
  solution: sudoku.solvepuzzle(setLeft(getBlank(), right.solutionSides.right)),
};
back.solutionSides = getSides(back.solution);

let left = {
  problem: null,
  solution: null,
};
left.solution = setLeft(getBlank(), back.solutionSides.right);
left.solution = setRight(left.solution, front.solutionSides.left);
left.solution = sudoku.solvepuzzle(left.solution);
left.solutionSides = getSides(left.solution);

let top = {
  problem: null,
  solution: null,
};
top.solution = setBottom(getBlank(), front.solutionSides.top);
top.solution = setTop(top.solution, back.solutionSides.top);
top.solution = setLeft(top.solution, left.solutionSides.top);
top.solution = setRight(top.solution, right.solutionSides.top);
top.solution = sudoku.solvepuzzle(top.solution);

let bottom = {
  problem: null,
  solution: null,
};
bottom.solution = setBottom(getBlank(), front.solutionSides.bottom);
bottom.solution = setTop(bottom.solution, back.solutionSides.bottom);
bottom.solution = setLeft(bottom.solution, left.solutionSides.bottom);
bottom.solution = setRight(bottom.solution, right.solutionSides.bottom);
bottom.solution = sudoku.solvepuzzle(bottom.solution);

let cube = {
  top: top,
  bottom: bottom,
  left: left,
  right: right,
  front: front,
  back: back,
};

export default cube;
/////////////////////////////////////////////////////

// TESTS
/////////////////////////////////////////////////////
// console.log("front");
// printPuzzle(front.solution)
// console.log("front left")
// console.log(front.solutionLeft)
// console.log("right");
// printPuzzle(right.solution)
// console.log("back");
// printPuzzle(back.solution)
// console.log("pre solution left")
// printPuzzle(left.solution)
// console.log("the whole cube");
// console.log(JSON.stringify(cube, null, 2));
/////////////////////////////////////////////////////
