const {
  calculateRatesInBinary,
  calculatePowerConsumption,
} = require("./part1");

describe("Binary Diagnostic: Part I", () => {
  const exampleDiagnosticReport = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  describe("gamma rate", () => {
    it("should calculate first bit of the gamma rate", () => {
      const { gammaRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(gammaRate[0]).toEqual("1");
    });

    it("should calculate second bit of the gamma rate", () => {
      const { gammaRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(gammaRate[1]).toEqual("0");
    });

    it("should calculate third bit of the gamma rate", () => {
      const { gammaRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(gammaRate[2]).toEqual("1");
    });

    it("should calculate fourth bit of the gamma rate", () => {
      const { gammaRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(gammaRate[3]).toEqual("1");
    });

    it("should calculate fifth bit of the gamma rate", () => {
      const { gammaRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(gammaRate[4]).toEqual("0");
    });
  });

  describe("epsilon rate", () => {
    it("should calculate first bit of the epsilon rate", () => {
      const { epsilonRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(epsilonRate[0]).toEqual("0");
    });

    it("should calculate second bit of the epsilon rate", () => {
      const { epsilonRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(epsilonRate[1]).toEqual("1");
    });

    it("should calculate third bit of the epsilon rate", () => {
      const { epsilonRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(epsilonRate[2]).toEqual("0");
    });

    it("should calculate fourth bit of the epsilon rate", () => {
      const { epsilonRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(epsilonRate[3]).toEqual("0");
    });

    it("should calculate fifth bit of the epsilon rate", () => {
      const { epsilonRate } = calculateRatesInBinary(exampleDiagnosticReport);
      expect(epsilonRate[4]).toEqual("1");
    });
  });

  describe("power consumption", () => {
    it("should calculate power consumption", () => {
      expect(
        calculatePowerConsumption({ gammaRate: "10110", epsilonRate: "01001" })
      ).toEqual(198);
    });
  });
});
