const currentFishes = require("./input.json");

function nextDay(fishes) {
  return fishes.reduce((fishesOfNextDay, fish) => {
    if (fish === 0) {
      fishesOfNextDay.push(6);
      fishesOfNextDay.push(8);
    } else {
      fishesOfNextDay.push(fish - 1);
    }
    return fishesOfNextDay;
  }, []);
}

function calculateFishPopulation(fishes, numberOfDays) {
  return range(1, numberOfDays).reduce((population) => {
    return nextDay(population);
  }, fishes);
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(calculateFishPopulation(currentFishes, 256).length);
