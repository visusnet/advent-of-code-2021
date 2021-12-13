const input = require("./input.json");

function simulateSteps(energyLevels, numberOfSteps) {
  return range(1, numberOfSteps).reduce(
    ({ energyLevels, numberOfFlashes }, _) =>
      nextStep(energyLevels, numberOfFlashes),
    { energyLevels, numberOfFlashes: 0 }
  );
}

function nextStep(currentEnergyLevels, currentNumberOfFlashes) {
  const alreadyFlashed = new Set();

  const chargedEnergyLevels = currentEnergyLevels.map(bumpEnergyLevels);
  const nextEnergyLevels = chargedEnergyLevels.reduce(
    (flashingEnergyLevels, row, y) =>
      row.reduce(
        (energyLevels, _, x) => flash(energyLevels, x, y, alreadyFlashed),
        flashingEnergyLevels
      ),
    chargedEnergyLevels
  );

  return {
    energyLevels: nextEnergyLevels.map(resetEnergyLevels),
    numberOfFlashes: alreadyFlashed.size + currentNumberOfFlashes,
    synchronized:
      alreadyFlashed.size ===
      currentEnergyLevels[0].length * currentEnergyLevels.length,
  };
}

function flash(energyLevels, x, y, alreadyFlashed) {
  const key = `${x},${y}`;
  if (
    alreadyFlashed.has(key) ||
    !existsIn(energyLevels)({ x, y }) ||
    energyLevels[y][x] <= 9
  ) {
    return energyLevels;
  }

  alreadyFlashed.add(key);

  return adjacentPositionsOf(x, y, energyLevels).reduce(
    (nextEnergyLevels, coordinates) =>
      flash(
        bumpEnergyLevelAt(nextEnergyLevels, coordinates.x, coordinates.y, 1),
        coordinates.x,
        coordinates.y,
        alreadyFlashed
      ),
    energyLevels
  );
}

function resetEnergyLevels(row) {
  return row.map((energyLevel) => (energyLevel > 9 ? 0 : energyLevel));
}

function bumpEnergyLevels(row) {
  return row.map((energyLevel) => energyLevel + 1);
}

function bumpEnergyLevelAt(energyLevels, x, y) {
  energyLevels[y][x]++;
  return energyLevels;
}

function adjacentPositionsOf(x, y, energyLevels) {
  return [
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ].filter(existsIn(energyLevels));
}

function existsIn(energyLevels) {
  return ({ x, y }) =>
    typeof energyLevels[y] !== "undefined" &&
    typeof energyLevels[y][x] !== "undefined";
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

//console.log(simulateSteps(input, 100).numberOfFlashes);

module.exports = {
  nextStep
}