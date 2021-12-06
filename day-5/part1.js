const allLineSegments = require("./input.json");

function calculateMap(lineSegments) {
  return lineSegments
    .filter(onlyHorizontalOrVerticalLines)
    .flatMap(toLineSegmentRange)
    .reduce(toMap, []);
}

function onlyHorizontalOrVerticalLines(lineSegment) {
  return lineSegment.x1 === lineSegment.x2 || lineSegment.y1 === lineSegment.y2;
}

function range(a, b) {
  return Array(Math.max(a, b) - Math.min(a, b) + 1)
    .fill()
    .map((_, index) => Math.min(a, b) + index);
}

function toLineSegmentRange({ x1, y1, x2, y2 }) {
  if (x1 === x2) {
    return range(y1, y2).map((y0) => [x1, y0]);
  }
  const m = (y2 - y1) / (x2 - x1);
  const b = y2 - m * x2;
  const f = (x) => m * x + b;
  return range(x1, x2).map((x0) => [x0, f(x0)]);
}

function toMap(map, [x, y]) {
  if (!map[x]) {
    map[x] = [];
  }
  map[x][y] = map[x][y] ? map[x][y] + 1 : 1;
  return map;
}

function numberOfOverlapsIn(map) {
  return map
    .flat()
    .reduce((overlaps, cell) => (cell >= 2 ? overlaps + 1 : overlaps), 0);
}

console.log(numberOfOverlapsIn(calculateMap(allLineSegments)));
