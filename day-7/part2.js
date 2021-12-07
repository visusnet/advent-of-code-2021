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
    .map((crabPosition) => sumTo(Math.abs(crabPosition - position)))
    .reduce(add, 0);
}

function sumTo(n) {
  return (n * (n + 1)) / 2;
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
