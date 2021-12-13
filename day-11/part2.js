const input = require("./input.json");
const { nextStep } = require("./part1");

function findSynchronizingStep(energyLevels, step = 1) {
  const { energyLevels: nextEnergyLevels, synchronized } = nextStep(
    energyLevels,
    0
  );
  if (synchronized) {
    return step;
  }
  return findSynchronizingStep(nextEnergyLevels, step + 1);
}

console.log(findSynchronizingStep(input));
