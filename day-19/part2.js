const input = require("./input.json");
const {
  addOverlapPathToOrigin,
  pairsOf,
  toTransformations,
  transform,
} = require("./part1");

function scannerCoordinatesOf(scanners, transformations) {
  return scanners.map((_, scannerIndex) =>
    scannerIndex === 0
      ? [0, 0, 0]
      : transformations[scannerIndex][0].reduce(transform, [[0, 0, 0]])[0]
  );
}

function maxManhattanDistanceOf(scannerCoords) {
  return scannerCoords.reduce(
    (maxDistance, coordinates1, index1) =>
      scannerCoords.reduce(
        (md, coordinates2, index2) =>
          index1 === index2
            ? md
            : Math.max(md, manhattenDistanceOf(coordinates1, coordinates2)),
        maxDistance
      ),
    0
  );
}

function manhattenDistanceOf([x1, y1, z1], [x2, y2, z2]) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
}

console.log(
  maxManhattanDistanceOf(
    scannerCoordinatesOf(
      input,
      addOverlapPathToOrigin(pairsOf(input).reduce(toTransformations, []))
    )
  )
);
