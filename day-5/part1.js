const allLineSegments = require("./input.json");

function calculateMap(lineSegments) {
  return lineSegments
    .map(normalize)
    .filter(onlyHorizontalOrVerticalLines)
    .flatMap(toLineSegmentRange)
    .reduce(toMap, []);
}

function normalize(lineSegment) {
  return {
    x1: Math.min(lineSegment.x1, lineSegment.x2),
    x2: Math.max(lineSegment.x1, lineSegment.x2),
    y1: Math.min(lineSegment.y1, lineSegment.y2),
    y2: Math.max(lineSegment.y1, lineSegment.y2),
  };
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

function toLineSegmentRange(lineSegment) {
  return range(lineSegment.x1, lineSegment.x2).reduce(
    (ranges, x) =>
      range(lineSegment.y1, lineSegment.y2).reduce(
        (r, y) => [...r, [x, y]],
        ranges
      ),
    []
  );
}

function toMap(map, [x, y]) {
  if (!map[x]) {
    map[x] = [];
  }
  map[x][y] = map[x][y] ? map[x][y] + 1 : 1;
  return map;
}

function onlyHorizontalOrVerticalLines(lineSegment) {
  return lineSegment.x1 === lineSegment.x2 || lineSegment.y1 === lineSegment.y2;
}

function numberOfOverlapsIn(map) {
  return map
    .flat()
    .reduce((overlaps, cell) => (cell >= 2 ? overlaps + 1 : overlaps), 0);
}

console.log(numberOfOverlapsIn(calculateMap(allLineSegments)));
