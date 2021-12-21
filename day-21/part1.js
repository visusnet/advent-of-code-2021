const input = require("./input.json");

function play(startingPositions) {
  const players = startingPositions.map((position) => ({
    position,
    score: 0,
    isWinner: false,
  }));

  const dice = rollDice();

  let lastRoll = null;

  while (!gameEnded(players)) {
    players.forEach((player) => {
      if (!gameEnded(players)) {
        const firstRoll = dice.next().value;
        const secondRoll = dice.next().value;
        lastRoll = dice.next().value;
        const moves = [firstRoll.eyes, secondRoll.eyes, lastRoll.eyes].reduce(
          add,
          0
        );

        player.position = ((player.position + moves - 1) % 10) + 1;
        player.score += player.position;

        if (player.score >= 1000) {
          player.isWinner = true;
        }
      }
    });
  }

  const winner = players.find((player) => player.isWinner);
  const loser = players.find((player) => !player.isWinner);
  return {
    winner,
    loser,
    numberOfRolls: lastRoll.numberOfRolls,
  };
}

function gameEnded(players) {
  return players.some((player) => player.isWinner);
}

function* rollDice() {
  let numberOfRolls = 0;
  while (true) {
    numberOfRolls++;
    yield { numberOfRolls, eyes: ((numberOfRolls - 1) % 100) + 1 };
  }
}

function toResult({ loser, numberOfRolls }) {
  return loser.score * numberOfRolls;
}

function add(accumulator, a) {
  return accumulator + a;
}

console.log(toResult(play(input)));

module.exports = {
  rollDice,
};
