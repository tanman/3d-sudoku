let sudoku = require("sudoku");
let fs = require("fs");
let puzzle = sudoku.makepuzzle();
let solution = sudoku.solvepuzzle(puzzle);

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

// INVALID SIDE CHECKING
/////////////////////////////////////////////////////
let checkSides = (rowA, rowB) => {
  for (let x = 0; x < rowA.length; x++) {
    if (rowA[x] === rowB[x]) return false;
  }
  return true;
};
/////////////////////////////////////////////////////

// SETUP SCRIPT
// Start with the front face, generate a sudoku
// match the right side of the front to the left
// side of the right face. Continue this to generate
// the four walls of the cube. The left side will need
// to line up with front left and back right.
// The top and bottom will need all 4 edges lined up.
/////////////////////////////////////////////////////

let success = false;
while (success === false) {
  let front = {
    problem: puzzle,
    solution: solution,
  };
  front.solutionSides = getSides(front.solution);

  let right = {
    problem: null,
    solution: sudoku.solvepuzzle(
      setLeft(getBlank(), front.solutionSides.right)
    ),
  };
  right.solutionSides = getSides(right.solution);

  let back = {
    problem: null,
    solution: sudoku.solvepuzzle(
      setLeft(getBlank(), right.solutionSides.right)
    ),
  };
  back.solutionSides = getSides(back.solution);

  let tmpBoard = setLeft(getBlank(), back.solutionSides.right);
  tmpBoard = setRight(tmpBoard, front.solutionSides.left);
  let left = {
    problem: null,
    solution: null,
  };
  try {
    if (checkSides(back.solutionSides.right, front.solutionSides.left)) {
      left.solution = sudoku.solvepuzzle(tmpBoard);
      let solutionSides = getSides(left.solution);
      left.solutionSides = solutionSides;
    } else {
      throw `LEFT: rows didn't line up RIP`;
    }
  } catch (err) {
    continue;
  }

  tmpBoard = setBottom(getBlank(), front.solutionSides.top);
  tmpBoard = setTop(tmpBoard, back.solutionSides.top);
  tmpBoard = setLeft(tmpBoard, left.solutionSides.top);
  tmpBoard = setRight(tmpBoard, right.solutionSides.top.reverse());
  let top = {
    problem: null,
    solution: null,
  };
  try {
    let sidesCheck = checkSides(
      left.solutionSides.top,
      right.solutionSides.top.reverse()
    );
    let topBottomCheck = checkSides(
      front.solutionSides.top,
      back.solutionSides.top
    );
    if (sidesCheck && topBottomCheck) {
      top.preSolved = tmpBoard;
      top.solution = sudoku.solvepuzzle(tmpBoard);
      if (!top.solution) throw "nullCheck fail";
    } else {
      throw `TOP: rows or cols didn't line up RIP`;
    }
  } catch (err) {
    continue;
  }

  tmpBoard = setBottom(getBlank(), front.solutionSides.bottom);
  tmpBoard = setTop(tmpBoard, back.solutionSides.bottom);
  tmpBoard = setLeft(tmpBoard, left.solutionSides.bottom);
  tmpBoard = setRight(tmpBoard, right.solutionSides.bottom.reverse());
  let bottom = {
    problem: null,
    solution: sudoku.solvepuzzle(tmpBoard),
  };
  try {
    let sidesCheck = checkSides(
      left.solutionSides.bottom,
      right.solutionSides.bottom.reverse()
    );
    let topBottomCheck = checkSides(
      front.solutionSides.bottom,
      back.solutionSides.bottom
    );
    if (sidesCheck && topBottomCheck) {
      bottom.solution = sudoku.solvepuzzle(tmpBoard);
    }
    if (!bottom.solution) throw "nullCheck fail";
  } catch (err) {
    console.log("failed at bottom, trying again...");
    continue;
  }

  let cube = {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    front: front,
    back: back,
  };
  success = true;
  fs.writeFile("./src/assets/seedCube.json", JSON.stringify(cube), (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("File written successfully");
    }
  });
}
