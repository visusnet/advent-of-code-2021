const { findLowPoints, toHeight } = require("./part1");

describe("Smoke Basin: Part I", () => {
  describe("findLowPoints", () => {
    it("should find the low point in the middle of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 9],
        [9, 0, 9],
        [9, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([0]);
    });

    it("should find the low point on the left edge of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 9],
        [1, 9, 9],
        [9, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([1]);
    });

    it("should find the low point on the right edge of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 9],
        [9, 9, 2],
        [9, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([2]);
    });

    it("should find the low point in the top left corner of a 3x3 heightmap", () => {
      const heightmap = [
        [3, 9, 9],
        [9, 9, 9],
        [9, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([3]);
    });

    it("should find the low point in the top right corner of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 4],
        [9, 9, 9],
        [9, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([4]);
    });

    it("should find the low point in the bottom left corner of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 9],
        [9, 9, 9],
        [5, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([5]);
    });

    it("should find the low point in the bottom right corner of a 3x3 heightmap", () => {
      const heightmap = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 6],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([6]);
    });

    it("should find multiple low points of a 5x5 heightmap", () => {
      const heightmap = [
        [9, 9, 0, 9, 1],
        [9, 2, 9, 3, 9],
        [4, 9, 5, 9, 6],
        [9, 9, 9, 9, 9],
        [7, 9, 8, 9, 9],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8,
      ]);
    });

    it("should not find points with lower adjacent locations of a 3x3 heightmap", () => {
      const heightmap = [
        [0, 1, 2],
        [1, 9, 1],
        [2, 1, 0],
      ];

      expect(findLowPoints(heightmap).map(toHeight)).not.toContain(9);
    });
  });
});
