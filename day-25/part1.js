const input = require("./input.json");

function numberOfStepsUntilStop(map) {
  let steps = 0;
  let moved = 0;
  let originalMap = map;

  do {
    moved = 0;

    const { map: mapAfterEastFacingMoved, moved: movedEast } =
      moveEastFacing(originalMap);

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

function moveEastFacing(originalMap) {
  let moved = 0;
  let map = clone(originalMap);

  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < map[rowIndex].length; cellIndex++) {
      if (
        isEastFacing(originalMap, rowIndex, cellIndex) &&
        canMoveEast(originalMap, rowIndex, cellIndex)
      ) {
        moved++;
        map = moveEast(map, rowIndex, cellIndex);
      }
    }
  }
  return { map, moved };
}

function moveSouthFacing(originalMap, map) {
  let moved = 0;
  for (let rowIndex = 0; rowIndex < originalMap.length; rowIndex++) {
    for (
      let cellIndex = 0;
      cellIndex < originalMap[rowIndex].length;
      cellIndex++
    ) {
      if (
        isSouthFacing(originalMap, rowIndex, cellIndex) &&
        canMoveSouth(originalMap, map, rowIndex, cellIndex)
      ) {
        moved++;
        map = moveSouth(map, rowIndex, cellIndex);
      }
    }
  }
  return { map: map, moved };
}

function canMoveSouth(map, nextMap, rowIndex, cellIndex) {
  const nextRowIndex = nextRowIndexFor(nextMap, rowIndex);
  return (
    isEmpty(nextMap, nextRowIndex, cellIndex) &&
    (isEmpty(map, nextRowIndex, cellIndex) ||
      isEastFacing(map, nextRowIndex, cellIndex))
  );
}

function moveSouth(map, rowIndex, cellIndex) {
  map[rowIndex][cellIndex] = ".";
  map[nextRowIndexFor(map, rowIndex)][cellIndex] = "v";
  return map;
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

function isEastFacing(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === ">";
}

function isSouthFacing(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === "v";
}

function isEmpty(map, rowIndex, cellIndex) {
  return map[rowIndex][cellIndex] === ".";
}

function clone(map) {
  return JSON.parse(JSON.stringify(map));
}

console.log(numberOfStepsUntilStop(input));
