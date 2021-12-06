const fs = require("fs");

function calculateRatesInBinary(diagnosticReport) {
  const transposedMatrix = transposeMatrix(
    diagnosticReport.map((value) =>
      value.split("").map((bitString) => Number(bitString))
    )
  );

  const gammaRate = transposedMatrix.map(aggregateToGammaRateBits).join("");
  const epsilonRate = transposedMatrix.map(aggregateToEpsilonRateBits).join("");

  return {
    gammaRate,
    epsilonRate,
  };
}

function calculatePowerConsumption(ratesInBinary) {
  return (
    parseInt(ratesInBinary.gammaRate, 2) *
    parseInt(ratesInBinary.epsilonRate, 2)
  );
}

function aggregateToGammaRateBits(bits) {
  return bits.length / 2 < bits.reduce(add, 0) ? 1 : 0;
}

function aggregateToEpsilonRateBits(bits) {
  return bits.length / 2 > bits.reduce(add, 0) ? 1 : 0;
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function add(accumulator, a) {
  return accumulator + a;
}

function readDiagnosticReport() {
  return fs
    .readFileSync("./diagnosticReport.txt")
    .toString("utf-8")
    .split("\n");
}

//console.log(
//  calculatePowerConsumption(calculateRatesInBinary(readDiagnosticReport()))
//);

module.exports = {
  readDiagnosticReport,
  calculateRatesInBinary,
  calculatePowerConsumption,
};
