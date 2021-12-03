const { countNumberofIncreases } = require("./part1");

describe("Sonar Sweep: Part I", () => {
  it("should identify 1 increase", () => {
    expect(countNumberofIncreases([1, 2])).toBe(1);
  });

  it("should not identify a decrease as increase", () => {
    expect(countNumberofIncreases([2, 1])).toBe(0);
  });

  it("should identify 2 increases", () => {
    expect(countNumberofIncreases([1, 2, 3])).toBe(2);
  });

  it("should identify 3 increases", () => {
    expect(countNumberofIncreases([1, 2, 3, 4])).toBe(3);
  });

  it("should not identify a decrease as increase between increases", () => {
    expect(countNumberofIncreases([1, 2, 1, 3, 4])).toBe(3);
  });
});
