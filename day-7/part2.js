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

const startTime = startTimer();
const optimalPosition = calculateOptimalPosition(currentCrabPositions);
const endTime = endTimer(startTime);
console.log(`${optimalPosition} in ${endTime}ms`);

function startTimer() {
  return process.hrtime();
}

function endTimer(time) {
  function roundTo(decimalPlaces, numberToRound) {
    return +(
      Math.round(numberToRound + `e+${decimalPlaces}`) + `e-${decimalPlaces}`
    );
  }
  const diff = process.hrtime(time);
  const NS_PER_SEC = 1e9;
  const result = diff[0] * NS_PER_SEC + diff[1];
  const elapsed = result * 0.000001;
  return roundTo(6, elapsed);
}
