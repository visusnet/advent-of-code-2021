const input = require("./input.json");
const { minimumRiskOf } = require("./part1");

function expandMap(tile) {
  return range(0, 4)
    .reduce(copyDown(tile), [])
    .map((row) => range(0, 4).reduce(copyRight(row), []));
}

function copyDown(tile) {
  return (map, tileY) => [...map, ...tile.map((row) => row.map(wrap(tileY)))];
}

function copyRight(row) {
  return (map, tileX) => [...map, ...row.map(wrap(tileX))];
}

function wrap(offset) {
  return (cell) => ((cell + offset - 1) % 9) + 1;
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(minimumRiskOf(expandMap(input)));

module.exports = {
  expandMap,
};
