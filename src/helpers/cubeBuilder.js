import * as cube from "../assets/cubeSeed.js";

export class cubeBuilder {
  constructor(difficulty) {
    this.processedCube = cube.default;
    this.key = this._getNumberKey();
    this.difficulty = difficulty;
    this._processCube();
  }

  _getRandomBoardIndex() {
    return Math.floor(Math.random() * 80);
  }
  _getNumberOfRemovals() {
    if (this.difficulty === "gigaTurboEasy") return 1;
    if (this.difficulty === "easy") return 30;
    if (this.difficulty === "medium") return 40;
    if (this.difficulty === "hard") return 50;
  }
  _getNumberKey() {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let key = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
      h: "",
      i: "",
    };
    for (let [letter] of Object.entries(key)) {
      let selectedIndex = Math.floor(Math.random() * nums.length);
      key[letter] = nums[selectedIndex];
      nums.splice(selectedIndex, 1);
    }
    return key;
  }

  _processCube() {
    const { front, back, left, right, top, bottom } = this.processedCube;
    this.processedCube.front.solution = this._buildBoardSolution(
      front.solution
    );
    this.processedCube.back.solution = this._buildBoardSolution(back.solution);
    this.processedCube.left.solution = this._buildBoardSolution(left.solution);
    this.processedCube.right.solution = this._buildBoardSolution(
      right.solution
    );
    this.processedCube.top.solution = this._buildBoardSolution(top.solution);
    this.processedCube.bottom.solution = this._buildBoardSolution(
      bottom.solution
    );

    this.processedCube.front.problem = this._buildBoardProblem(front.solution);
    this.processedCube.back.problem = this._buildBoardProblem(back.solution);
    this.processedCube.left.problem = this._buildBoardProblem(left.solution);
    this.processedCube.right.problem = this._buildBoardProblem(right.solution);
    this.processedCube.top.problem = this._buildBoardProblem(top.solution);
    this.processedCube.bottom.problem = this._buildBoardProblem(
      bottom.solution
    );
  }

  _buildBoardSolution(board) {
    let newBoard = [];
    for (let x = 0; x < board.length; x++) {
      newBoard.push(this.key[board[x]]);
    }
    return newBoard;
  }
  _buildBoardProblem(board) {
    let newBoard = [];
    board.forEach((num)=>{
      newBoard.push(num)
    });
    let removals = this._getNumberOfRemovals();
    while (removals > 0) {
      let selectedIndex = this._getRandomBoardIndex();
      newBoard[selectedIndex] = 0;
      removals--;
    }
    return newBoard;
  }
}
