const currentFishes = require("./input.json");

function calculateFishPopulation(fishes, numberOfDays) {
  return range(1, numberOfDays)
    .reduce(nextDay, toSchool(fishes))
    .reduce(add, 0);
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

function nextDay(school) {
  const nextDaySchool = [];
  nextDaySchool[0] = school[1] || 0;
  nextDaySchool[1] = school[2] || 0;
  nextDaySchool[2] = school[3] || 0;
  nextDaySchool[3] = school[4] || 0;
  nextDaySchool[4] = school[5] || 0;
  nextDaySchool[5] = school[6] || 0;
  nextDaySchool[6] = (school[0] || 0) + (school[7] || 0);
  nextDaySchool[7] = school[8] || 0;
  nextDaySchool[8] = school[0] || 0;
  return nextDaySchool;
}

function toSchool(fishes) {
  return fishes.reduce((school, fish) => {
    school[fish] = (school[fish] || 0) + 1;
    return school;
  }, []);
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
  const time = process.hrtime();
  return time;
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
