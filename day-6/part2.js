const currentFishes = require("./input.json");

function calculateFishPopulation(fishes, numberOfDays) {
  return range(1, numberOfDays)
    .reduce(nextDay, toSchool(fishes))
    .reduce(add, 0);
}

function nextDay(school, day) {
  school[(day + 7) % 9] = (school[(day + 7) % 9] || 0) + (school[day % 9] || 0);
  return school;
}

function toSchool(fishes) {
  return fishes.reduce((school, fish) => {
    school[fish] = (school[fish] || 0) + 1;
    return school;
  }, []);
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

function add(accumulator, a) {
  return accumulator + a;
}

const startTime = startTimer();
const population = calculateFishPopulation(
  currentFishes,
  Number(process.argv[2]) || 256
);
const endTime = endTimer(startTime);
console.log(`${population} in ${endTime}ms`);

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
