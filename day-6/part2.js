const currentFishes = require("./input.json");

function calculateFishPopulation(fishes, numberOfDays) {
  let school = toSchool(fishes);
  for (let day = 1; day <= numberOfDays; day++) {
    school = nextDay(school);
  }

  return school.reduce(add, 0);
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

const startTime = new Date().getMilliseconds();
const population = calculateFishPopulation(currentFishes, 256);
const endTime = new Date().getMilliseconds();
console.log(`${population} in ${endTime - startTime}ms`);
