const input = require("./input.json");
const { findLowPoints } = require("./part1");

function findBasinSizes(heightmap) {
  return findLowPoints(heightmap).map(toBasin(heightmap)).map(toSize);
}

function top3Of(sizes) {
  return sizes.slice().sort(byDesc).slice(0, 3);
}

function byDesc(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}

function toBasin(heightmap) {
  return ({ x, y }) => findBasinLocations(x, y, heightmap);
}

function toSize(basinLocations) {
  return basinLocations.length;
}

function findBasinLocations(x, y, heightmap, consideredLocations = []) {
  if (
    locationExists(heightmap, x, y) &&
    notContainedIn(consideredLocations, x, y)
  ) {
    consideredLocations.push({ x, y });

    if (heightmap[y][x] < 9) {
      return [
        { x, y },
        ...[
          { x: x - 1, y },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x, y: y + 1 },
        ].flatMap(({ x: adjacentX, y: adjacentY }) =>
          findBasinLocations(
            adjacentX,
            adjacentY,
            heightmap,
            consideredLocations
          )
        ),
      ];
    }
  }

  return [];
}

function locationExists(heightmap, x, y) {
  return x >= 0 && y >= 0 && heightmap[0].length > x && heightmap.length > y;
}

function notContainedIn(consideredLocations, x, y) {
  return !consideredLocations.some(
    (consideredLocation) =>
      consideredLocation.x === x && consideredLocation.y === y
  );
}

function multiply(accumulator, n) {
  return accumulator * n;
}

console.log(top3Of(findBasinSizes(input)).reduce(multiply, 1));

module.exports = {
  findBasinSizes,
};
