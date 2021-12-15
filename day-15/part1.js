const input = require("./input.json");

function minimumRiskOf(map) {
  const [maxY, maxX] = maxOf(map);

  const riskFactors = {};
  const queue = [[0, 0, 0]];
  const visitedCells = new Set();

  while (queue.length > 0) {
    const [riskFactor, x, y] = queue.shift();
    const key = keyOf(x, y);

    if (!visitedCells.has(key)) {
      visitedCells.add(key);
      riskFactors[key] = riskFactor;

      adjacentCells(x, y)
        .filter(inMap(maxX, maxY))
        .forEach(addToQueue(queue, riskFactor, map));

      queue.sort(byRisk);
    }
  }

  return riskFactors[keyOf(maxX, maxY)];
}

function maxOf(map) {
  return [map.length - 1, map[0].length - 1];
}

function keyOf(x, y) {
  return `${y},${x}`;
}

function adjacentCells(x, y) {
  return [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x + 1, y],
  ];
}

function addToQueue(queue, riskFactor, map) {
  return ([newX, newY]) =>
    queue.push([map[newY][newX] + riskFactor, newX, newY]);
}

function byRisk(a, b) {
  return a[0] - b[0];
}

function inMap(maxX, maxY) {
  return ([x, y]) => y >= 0 && y <= maxY && x <= maxX && x >= 0;
}

console.log(minimumRiskOf(input));

module.exports = {
  minimumRiskOf,
};
