const input = require("./input.json");

const numberOfIncreases = input.reduce(
  (previousValue, _, currentIndex, numbers) =>
    numbers[currentIndex - 1] < numbers[currentIndex]
      ? previousValue + 1
      : previousValue,
  0
);

console.log(numberOfIncreases);
