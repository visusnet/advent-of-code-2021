const { findBasinSizes } = require("./part2");

describe("Smoke Basin: Part II", () => {
  describe("findBasinSizes", () => {
    const heightmap = [
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];
    it("should find the top-left basin size", () => {
      expect(findBasinSizes(heightmap)).toContain(3);
    });

    it("should find the top-right basin size", () => {
      expect(findBasinSizes(heightmap)).toContain(9);
    });

    it("should find the middle basin size", () => {
      expect(findBasinSizes(heightmap)).toContain(14);
    });
  });
});
