const allBoards = require("./boards.json");
const allDrawnNumbers = require("./numbers.json");

function findFirstWinner(boards, numbers, currentDrawnNumberIndex = 0) {
  const winningBoard = boards.find(
    isWinner(numbers.slice(0, currentDrawnNumberIndex + 1))
  );
  if (winningBoard) {
    return {
      winningBoard,
      winningNumber: numbers[currentDrawnNumberIndex],
      markedNumbers: numbers.slice(0, currentDrawnNumberIndex + 1),
    };
  }
  return findFirstWinner(boards, numbers, currentDrawnNumberIndex + 1);
}

function isWinner(drawnNumbers) {
  return (board) =>
    board.some(isWinningRow(drawnNumbers)) ||
    transposeMatrix(board).some(isWinningRow(drawnNumbers));
}

function isWinningRow(drawnNumbers) {
  return (row) => {
    return row.every((number) => drawnNumbers.includes(number));
  };
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function scoreOf({ winningBoard, markedNumbers, winningNumber }) {
  return (
    winningBoard
      .flat()
      .filter((number) => !markedNumbers.includes(number))
      .reduce(add, 0) * winningNumber
  );
}

function add(accumulator, a) {
  return accumulator + a;
}

const winner = findFirstWinner(allBoards, allDrawnNumbers);
console.log({
  winningBoard: winner.winningBoard,
  markedNumbers: winner.markedNumbers,
  score: scoreOf(winner),
});
