const input = require("./edges.json");
const { toConnections, isSmall, add } = require("./part1");

function smallCavesOf(edges) {
  return edges
    .flat()
    .filter((cave) => isSmall(cave) && cave !== "start" && cave !== "end");
}

function numberOfPathsToEnd(
  connections,
  smallCaves,
  cave = "start",
  previouslyVisitedCaves = []
) {
  const visitedCaves = [...previouslyVisitedCaves];
  if (cave === "end") {
    return 1;
  }
  if (cave === "start" && visitedCaves.includes("start")) {
    return 0;
  }
  if (
    cave !== "end" &&
    visitedCaves.includes(cave) &&
    isVisitLimitReached(visitedCaves, smallCaves)
  ) {
    return 0;
  }
  if (isSmall(cave)) {
    visitedCaves.push(cave);
  }
  return connections[cave]
    .map((nextCave) =>
      numberOfPathsToEnd(connections, smallCaves, nextCave, visitedCaves)
    )
    .reduce(add, 0);
}

function isVisitLimitReached(visitedCaves, smallCaves) {
  return smallCaves.some(
    (smallCave) =>
      visitedCaves.filter((visitedCave) => visitedCave === smallCave).length > 1
  );
}

console.log(numberOfPathsToEnd(toConnections(input), smallCavesOf(input)));
