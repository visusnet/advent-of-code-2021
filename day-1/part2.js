const input = require("./input.json");
const { countNumberofIncreases } = require("./part1");

function calculateSlidingWindowSums(numbers) {
  return numbers.reduce((previousValue, _, currentIndex) => {
    if (currentIndex > 1) {
      return previousValue.concat(
        numbers[currentIndex - 2] +
          numbers[currentIndex - 1] +
          numbers[currentIndex]
      );
    }
    return previousValue;
  }, []);
}

// console.log(countNumberofIncreases(calculateSlidingWindowSums(input)));

module.exports = {
  calculateSlidingWindowSums,
};
