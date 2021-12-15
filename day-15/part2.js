const input = require("./input.json");
const { minimumRiskOf } = require("./part1");

function expandMap(tile) {
  return range(0, 4)
    .reduce(
      (map, tileY) => [
        ...map,
        ...tile.map((row) => row.map((cell) => ((cell + tileY - 1) % 9) + 1)),
      ],
      []
    )
    .map((row) =>
      range(0, 4).reduce(
        (map, tileX) => [
          ...map,
          ...row.map((cell) => ((cell + tileX - 1) % 9) + 1),
        ],
        []
      )
    );
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
