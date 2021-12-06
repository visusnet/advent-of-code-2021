const allBoards = require("./boards.json");
const allDrawnNumbers = require("./numbers.json");

function findWinners(
  boards,
  numbers,
  currentDrawnNumberIndex = 0,
  winners = []
) {
  const winningBoards = boards.filter(
    isWinner(numbers.slice(0, currentDrawnNumberIndex + 1))
  );
  const notWinningBoards = boards.filter(
    isNotWinner(numbers.slice(0, currentDrawnNumberIndex + 1))
  );
  winners.push(
    ...winningBoards.map((winningBoard) => ({
      winningBoard,
      winningNumber: numbers[currentDrawnNumberIndex],
      markedNumbers: numbers.slice(0, currentDrawnNumberIndex + 1),
    }))
  );
  return currentDrawnNumberIndex !== numbers.length - 1
    ? findWinners(
        notWinningBoards,
        numbers,
        currentDrawnNumberIndex + 1,
        winners
      )
    : winners;
}

function isWinner(drawnNumbers) {
  return (board) =>
    board.some(isWinningRow(drawnNumbers)) ||
    transposeMatrix(board).some(isWinningRow(drawnNumbers));
}

function isNotWinner(drawnNumbers) {
  return (board) =>
    !board.some(isWinningRow(drawnNumbers)) &&
    !transposeMatrix(board).some(isWinningRow(drawnNumbers));
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

function lastWinnerOf(winners) {
  return winners[winners.length - 1];
}

const winners = findWinners(allBoards, allDrawnNumbers);
const winner = lastWinnerOf(winners);

console.log({
  winningBoard: winner.winningBoard,
  markedNumbers: winner.markedNumbers,
  score: scoreOf(winner),
});

module.exports = {
  findWinners,
  lastWinnerOf,
};
