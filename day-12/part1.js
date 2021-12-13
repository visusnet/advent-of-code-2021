const input = require("./edges.json");

function toConnections(edges) {
  return edges.reduce((connections, [from, to]) => {
    connections[from] = connections[from] ? connections[from].concat(to) : [to];
    connections[to] = connections[to] ? connections[to].concat(from) : [from];
    return connections;
  }, {});
}

function numberOfPathsToEnd(
  connections,
  cave = "start",
  previouslyVisitedCaves = []
) {
  const visitedCaves = [...previouslyVisitedCaves];
  if (cave === "end") {
    return 1;
  }
  if (cave !== "end" && visitedCaves.includes(cave)) {
    return 0;
  }
  if (isSmall(cave)) {
    visitedCaves.push(cave);
  }
  return connections[cave]
    .map((nextCave) => numberOfPathsToEnd(connections, nextCave, visitedCaves))
    .reduce(add, 0);
}

function add(accumulator, a) {
  return accumulator + a;
}

function isSmall(cave) {
  return cave.charCodeAt(0) >= 97;
}

//console.log(numberOfPathsToEnd(toConnections(input)));

module.exports = {
  toConnections,
  isSmall,
  add,
};
