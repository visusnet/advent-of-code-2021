const {
  findRating,
  findRatingsInBinary,
  calculateLifeSupportRating,
} = require("./part2");

describe("Binary Diagnostic: Part II", () => {
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

  it("should find single matching rating", () => {
    expect(findRating(["11111", "00000"], "11111", 1, "1")).toEqual("11111");
  });

  it("should find only rating left", () => {
    expect(findRating(["11100"], "11111", 1, "1")).toEqual("11100");
  });

  it("should prefer 1 when specified", () => {
    expect(findRating(["10110", "10111"], "10110", 4, "1")).toEqual("10111");
  });

  it("should prefer 0 when specified", () => {
    expect(findRating(["01111", "01010"], "01111", 2, "0")).toEqual("01010");
  });

  it("should find 10111 as oxygen generator rating", () => {
    expect(
      findRatingsInBinary(exampleDiagnosticReport).oxygenGeneratorRating
    ).toEqual("10111");
  });

  it("should find 10111 as CO2 scrubber rating", () => {
    expect(
      findRatingsInBinary(exampleDiagnosticReport).co2ScrubberRating
    ).toEqual("01010");
  });

  it("should calculate life support rating", () => {
    expect(
      calculateLifeSupportRating({
        oxygenGeneratorRating: "10111",
        co2ScrubberRating: "01010",
      })
    ).toEqual(230);
  });
});
