const input = require("./input.json");

const slidingWindowSums = input.reduce(
  (previousValue, _, currentIndex, numbers) => {
    if (currentIndex > 1) {
      return previousValue.concat(
        numbers[currentIndex - 2] +
          numbers[currentIndex - 1] +
          numbers[currentIndex]
      );
    }
    return previousValue;
  },
  []
);

const numberOfIncreases = slidingWindowSums.reduce(
  (previousValue, _, currentIndex, numbers) =>
    numbers[currentIndex - 1] < numbers[currentIndex]
      ? previousValue + 1
      : previousValue,
  0
);

console.log(numberOfIncreases);
