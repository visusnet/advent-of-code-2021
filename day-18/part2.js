const input = require("./input.json");
const {
  magnitudeOf,
  reduceSnailfishNumbers,
  addSnailfishNumbers,
} = require("./part1");

function largestMagnitudeOfAnySumOf(snailfishNumbers) {
  return snailfishNumbers.reduce(
    (max, snailfishNumber1) =>
      Math.max(
        max,
        ...input.map((snailfishNumber2) =>
          magnitudeOf(
            reduceSnailfishNumbers(
              addSnailfishNumbers(snailfishNumber1, snailfishNumber2)
            )
          )
        )
      ),
    0
  );
}

console.log(largestMagnitudeOfAnySumOf(input));
