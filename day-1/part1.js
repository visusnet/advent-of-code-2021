const input = require("./input.json");

function countNumberofIncreases(numbers) {
  return numbers.reduce(
    (previousValue, _, currentIndex) =>
      numbers[currentIndex - 1] < numbers[currentIndex]
        ? previousValue + 1
        : previousValue,
    0
  );
}

// console.log(countNumberofIncreases(input));

module.exports = {
  countNumberofIncreases,
};
