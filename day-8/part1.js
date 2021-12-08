const input = require("./input.json");

function countDigits1478(entries) {
  const digitToNumberOfSegments = {
    1: 2,
    4: 4,
    7: 3,
    8: 7,
  };

  const identifiableSegmentLenghts = Object.values(digitToNumberOfSegments);
  return entries
    .map(
      (entry) =>
        entry.outputValue.filter((outputValueSignal) =>
          identifiableSegmentLenghts.includes(outputValueSignal.length)
        ).length
    )
    .reduce(add, 0);
}

function add(accumulator, a) {
  return accumulator + a;
}

console.log(countDigits1478(input));
