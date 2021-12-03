const { calculateSlidingWindowSums } = require("./part2");
const { countNumberofIncreases } = require("./part1");

describe("Sonar Sweep: Part II", () => {
  it("should not have a sliding window sum when there are less than 3 measurements", () => {
    expect(calculateSlidingWindowSums([1])).toEqual([]);
    expect(calculateSlidingWindowSums([1, 2])).toEqual([]);
  });

  it("should have a sliding window sum when there are 3 measurements", () => {
    expect(calculateSlidingWindowSums([1, 2, 3])).toEqual([6]);
  });

  it("should have 2 sliding window sums when there are 4 measurements", () => {
    expect(calculateSlidingWindowSums([1, 2, 3, 4])).toEqual([6, 9]);
  });

  it("should have 3 sliding window sums when there are 5 measurements", () => {
    expect(calculateSlidingWindowSums([1, 2, 3, 4, 5])).toEqual([6, 9, 12]);
  });

  it("should count increases of sliding window sums", () => {
    expect(
      countNumberofIncreases(calculateSlidingWindowSums([1, 2, 3, 4, 5]))
    ).toEqual(2);
  });

  it("should not count decreases as increases of sliding window sums between increases", () => {
    expect(
      countNumberofIncreases(calculateSlidingWindowSums([1, 2, 3, 1, 4]))
    ).toEqual(1);
  });
});
