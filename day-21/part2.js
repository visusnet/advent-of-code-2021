const input = require("./input.json");

const rolls = new Map([
  [3, 1], // [1,1,1]
  [4, 3], // [1,1,2], [1,2,1], [2,1,1]
  [5, 6], // [1,1,3], [1,3,1], [3,1,1], [2,2,3], [2,3,2], [3,2,2]
  [6, 7], // [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,2,1], [3,1,2], [2,2,2]
  [7, 6], // [1,3,3], [3,1,3], [3,3,1], [2,2,3], [2,3,2], [3,2,2]
  [8, 3], // [2,3,3], [3,2,3], [3,3,2]
  [9, 1], // [3,3,3]
]);

function takeTurn(players, currentPlayerIndex) {
  return [...rolls.entries()].reduce((numberOfWins, [eyes, combos]) => {
    const turnPlayers = [{ ...players[0] }, { ...players[1] }];

    turnPlayers[currentPlayerIndex].position = nextPosition(
      turnPlayers,
      currentPlayerIndex,
      eyes
    );
    turnPlayers[currentPlayerIndex].score +=
      turnPlayers[currentPlayerIndex].position;

    return turnPlayers[currentPlayerIndex].score >= 21
      ? currentPlayerIndex === 1
        ? numberOfWins
        : numberOfWins + combos
      : numberOfWins +
          combos * takeTurn(turnPlayers, nextPlayer(currentPlayerIndex));
  }, 0);
}

function nextPlayer(currentPlayerIndex) {
  return (currentPlayerIndex + 1) % 2;
}

function nextPosition(turnPlayers, currentPlayerIndex, eyes) {
  return ((turnPlayers[currentPlayerIndex].position - 1 + eyes) % 10) + 1;
}

function toPlayers(startingPositions) {
  return startingPositions.map((position) => ({
    position,
    score: 0,
  }));
}

console.log(takeTurn(toPlayers(input), 0));
