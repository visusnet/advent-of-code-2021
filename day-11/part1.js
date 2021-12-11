const input = require("./input.json");

function simulateSteps(energyLevels, numberOfSteps) {
  return range(1, numberOfSteps).reduce(
    ({ nextEnergyLevels, numberOfFlashes }) =>
      nextStep(energyLevels, numberOfFlashes),
    { nextEnergyLevels: energyLevels, numberOfFlashes: 0 }
  );
}

function nextStep(energyLevels, previousNumberOfFlashes = 0) {
  const { nextEnergyLevels, numberOfFlashes } = flash(
    energyLevels.map((row) => row.map((energyLevel) => energyLevel + 1))
  );

  return {
    nextEnergyLevels,
    numberOfFlashes: numberOfFlashes + previousNumberOfFlashes,
  };
}

function flash(energyLevels, previousNumberOfFlashes = 0) {
  const { nextEnergyLevels, numberOfFlashes } = energyLevels.reduce(
    (result, row, y) => {
      return row.reduce(
        ({ nextEnergyLevels, numberOfFlashes }, energyLevel, x) => {
          if (energyLevel > 9) {
            numberOfFlashes++;
            nextEnergyLevels = bumpAdjacentLevels(nextEnergyLevels, x, y);
          }
          return { nextEnergyLevels, numberOfFlashes };
        },
        result
      );
    },
    { nextEnergyLevels: energyLevels, numberOfFlashes: 0 }
  );

  if (numberOfFlashes > 0) {
    return flash(nextEnergyLevels, numberOfFlashes + previousNumberOfFlashes);
  }

  return {
    nextEnergyLevels,
    numberOfFlashes: numberOfFlashes + previousNumberOfFlashes,
  };
}

function bumpAdjacentLevels(energyLevels, x, y) {
  const coordinatesList = [
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ];
  return coordinatesList.reduce((energyLevels, coordinates) => {
    if (
      energyLevels[coordinates.y] &&
      typeof energyLevels[coordinates.y][coordinates.x] !== "undefined"
    ) {
      energyLevels[coordinates.y][coordinates.x]++;
    }
    return energyLevels;
  }, energyLevels);
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(simulateSteps(input, 100).numberOfFlashes);
