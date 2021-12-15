const input = require("./input.json");

function minimumRiskOf(map) {
  const bottom = map.length - 1;
  const right = map[0].length - 1;
  const end = `${bottom}.${right}`;

  const riskFactors = {};
  const queue = [[0, 0, 0]];
  const visited = new Set();

  while (queue.length) {
    const [riskFactor, y, x] = queue.shift();
    const key = `${y}.${x}`;
    const currentRisk = riskFactors[key] || Infinity;

    if (!visited.has(key)) {
      visited.add(key);
      riskFactors[key] = riskFactor;

      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const newX = x + dx;
        const newY = y + dy;

        if (newY >= 0 && newY <= bottom && newX <= right && newX >= 0)
          queue.push([map[newY][newX] + riskFactor, newY, newX]);
      }

      queue.sort((a, b) => a[0] - b[0]);
    }
  }

  return riskFactors[end];
}

//console.log(minimumRiskOf(input));

module.exports = {
  minimumRiskOf,
};
