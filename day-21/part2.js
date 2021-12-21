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

function takeTurn(players, currentPlayerIndex, knownGames = new Map()) {
  const key = gameKeyFor(players, currentPlayerIndex);
  if (knownGames.has(key)) {
    return knownGames.get(key);
  }

  const numberOfWins = [...rolls.entries()].reduce((wins, [eyes, combos]) => {
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
        ? wins
        : wins + combos
      : wins +
          combos *
            takeTurn(turnPlayers, nextPlayer(currentPlayerIndex), knownGames);
  }, 0);

  knownGames.set(key, numberOfWins);

  return numberOfWins;
}

function gameKeyFor(players, currentPlayerIndex) {
  return players
    .flatMap((player) => [player.position, player.score])
    .concat(currentPlayerIndex)
    .join("-");
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
