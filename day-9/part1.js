const input = require("./input.json");

function findLowPoints(heightmap) {
  return heightmap.reduce((lowPoints, currentRow, y) => {
    return currentRow.reduce((lPoints, height, x) => {
      if (
        isHigher(heightmap, x, y - 1, height) &&
        isHigher(heightmap, x, y + 1, height) &&
        isHigher(heightmap, x - 1, y, height) &&
        isHigher(heightmap, x + 1, y, height)
      ) {
        lPoints.push({ height, riskLevel: height + 1, x, y });
      }
      return lPoints;
    }, lowPoints);
  }, []);
}

function isHigher(heightmap, x, y, height) {
  const locationExists =
    x >= 0 && x < heightmap[0].length && y >= 0 && y < heightmap.length;
  return !locationExists || heightmap[y][x] > height;
}

function toHeight({ height }) {
  return height;
}

function toRiskLevel({ riskLevel }) {
  return riskLevel;
}

function toRiskLevels(lowPoints) {
  return lowPoints.map(toRiskLevel);
}

function sumOfRiskLevels(riskLevels) {
  return riskLevels.reduce(add, 0);
}

function add(accumulator, a) {
  return accumulator + a;
}

//console.log(sumOfRiskLevels(toRiskLevels(findLowPoints(input))));

module.exports = {
  findLowPoints,
  toHeight,
};
