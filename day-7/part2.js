const currentCrabPositions = require("./input.json");

function calculateOptimalPosition(crabPositions) {
  return range(Math.min(...crabPositions), Math.max(...crabPositions)).reduce(
    (minimumFuel, position) =>
      Math.min(calculateFuelConsumption(crabPositions, position), minimumFuel),
    Infinity
  );
}

function calculateFuelConsumption(crabPositions, position) {
  return crabPositions
    .map((crabPosition) => sumOfRange(0, Math.abs(crabPosition - position)))
    .reduce(add, 0);
}

function sumOfRange(start, end) {
  return range(start, end).reduce(add, 0);
}

function add(accumulator, a) {
  return accumulator + a;
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(calculateOptimalPosition(currentCrabPositions));
