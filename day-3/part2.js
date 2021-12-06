const { readDiagnosticReport, calculateRatesInBinary } = require("./part1");

function findRatingsInBinary(diagnosticReport) {
  const { gammaRate, epsilonRate } = calculateRatesInBinary(diagnosticReport);

  const oxygenGeneratorRating = findRating(diagnosticReport, gammaRate, 1, "1");
  const co2ScrubberRating = findRating(diagnosticReport, epsilonRate, 1, "0");

  return {
    oxygenGeneratorRating,
    co2ScrubberRating,
  };
}

function findRating(potentialRatings, bitPattern, length, preferredBit) {
  const matchingRatings = potentialRatings.filter((value) =>
    value.startsWith(bitPattern.substring(0, length))
  );
  return matchingRatings.length === 1
    ? matchingRatings[0]
    : findRating(
        matchingRatings,
        haveEquallyCommonBit(matchingRatings, length + 1)
          ? bitPattern
              .substring(0, length)
              .concat(preferredBit)
              .concat(bitPattern.substring(length + 1))
          : bitPattern,
        length + 1,
        preferredBit
      );
}

function haveEquallyCommonBit(potentialRatings, bitPosition) {
  const bitCounts = potentialRatings
    .map((value) => value.substring(bitPosition - 1, bitPosition))
    .reduce(
      (counts, value) => {
        counts[value]++;
        return counts;
      },
      [0, 0]
    );
  return bitCounts[0] === bitCounts[1];
}

function calculateLifeSupportRating(ratingsInBinary) {
  return (
    parseInt(ratingsInBinary.oxygenGeneratorRating, 2) *
    parseInt(ratingsInBinary.co2ScrubberRating, 2)
  );
}

console.log(
  calculateLifeSupportRating(findRatingsInBinary(readDiagnosticReport()))
);

module.exports = {
  findRating,
  findRatingsInBinary,
  calculateLifeSupportRating,
};
