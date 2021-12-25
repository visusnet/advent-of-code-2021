const input = require("./input.json");

function numberOfStepsUntilStop(map) {
  let steps = 0;
  let originalMap = map;

  let moved;
  do {
    const { map: mapAfterEastFacingMoved, moved: movedEast } = moveEastFacing(
      originalMap,
      clone(originalMap)
    );

    const { map: mapAfterAllMoved, moved: movedSouth } = moveSouthFacing(
      originalMap,
      mapAfterEastFacingMoved
    );

    moved = movedEast + movedSouth;

    originalMap = mapAfterAllMoved;
    steps++;
  } while (moved > 0);

  return steps;
}

function moveEastFacing(originalMap, mapBeforeEastFacingMoved) {
  return originalMap.reduce(
    (mapAndMoved, row, rowIndex) =>
      row.reduce(
        ({ map, moved }, _, cellIndex) =>
          shouldMoveEast(originalMap, rowIndex, cellIndex)
            ? { map: moveEast(map, rowIndex, cellIndex), moved: moved + 1 }
            : { map, moved },
        mapAndMoved
      ),
    { map: mapBeforeEastFacingMoved, moved: 0 }
  );
}

function moveSouthFacing(originalMap, mapAfterEastFacingMoved) {
  return originalMap.reduce(
    (mapAndMoved, row, rowIndex) =>
      row.reduce(
        ({ map, moved }, _, cellIndex) =>
          shouldMoveSouth(originalMap, map, rowIndex, cellIndex)
            ? {
                map: moveSouth(map, rowIndex, cellIndex),
                moved: moved + 1,
              }
            : { map, moved },
        mapAndMoved
      ),
    { map: mapAfterEastFacingMoved, moved: 0 }
  );
}

function shouldMoveSouth(originalMap, map, rowIndex, cellIndex) {
  return (
    isSouthFacing(originalMap, rowIndex, cellIndex) &&
    canMoveSouth(originalMap, map, rowIndex, cellIndex)
  );
}

function isSouthFacing(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === "v";
}

function canMoveSouth(originalMap, map, rowIndex, cellIndex) {
  const nextRowIndex = nextRowIndexFor(map, rowIndex);
  const southCellIsEmpty = isEmpty(map, nextRowIndex, cellIndex);
  const southCellWasEmpty = isEmpty(originalMap, nextRowIndex, cellIndex);
  const southCellWasEmptied = shouldMoveEast(
    originalMap,
    nextRowIndex,
    cellIndex
  );
  return southCellIsEmpty && (southCellWasEmpty || southCellWasEmptied);
}

function moveSouth(map, rowIndex, cellIndex) {
  map[rowIndex][cellIndex] = ".";
  map[nextRowIndexFor(map, rowIndex)][cellIndex] = "v";
  return map;
}

function shouldMoveEast(map, rowIndex, cellIndex) {
  return (
    isEastFacing(map, rowIndex, cellIndex) &&
    canMoveEast(map, rowIndex, cellIndex)
  );
}

function isEastFacing(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === ">";
}

function canMoveEast(map, rowIndex, cellIndex) {
  return isEmpty(map, rowIndex, nextCellIndexFor(map, cellIndex));
}

function moveEast(map, rowIndex, cellIndex) {
  map[rowIndex][cellIndex] = ".";
  map[rowIndex][nextCellIndexFor(map, cellIndex)] = ">";
  return map;
}

function nextCellIndexFor(map, cellIndex) {
  return (cellIndex + 1) % map[0].length;
}

function nextRowIndexFor(map, rowIndex) {
  return (rowIndex + 1) % map.length;
}

function isEmpty(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === ".";
}

function clone(map) {
  return JSON.parse(JSON.stringify(map));
}

console.log(numberOfStepsUntilStop(input));
