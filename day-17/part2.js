const fs = require("fs");
const path = require("path");
const { readInput, range, runSimulation, toTarget } = require("./part1");

function possibleVelocitiesOf(target) {
  const { bestYVelocity } = range(1, 100).reduce(
    ({ bestYVelocity, xVelocity, yVelocity }) => {
      const { success, x } = runSimulation(xVelocity, yVelocity, target);
      if (success) {
        bestYVelocity = yVelocity;
        yVelocity++;
      }
      if (x > target.end.x) {
        xVelocity--;
      } else if (x < target.start.x) {
        xVelocity++;
      } else {
        xVelocity--;
        yVelocity++;
      }
      return { bestYVelocity, xVelocity, yVelocity };
    },
    {
      bestYVelocity: 0,
      xVelocity: 24,
      yVelocity: 80,
    }
  );

  const minTargetY = Math.min(target.start.y, target.end.y);
  const possibleXVelocities = Array(target.end.x)
    .fill(1)
    .map((v, i) => v + i);
  const possibleYVelocities = Array(Math.abs(minTargetY) + bestYVelocity + 1)
    .fill(minTargetY)
    .map((v, i) => v + i);

  return possibleXVelocities.flatMap((x) =>
    possibleYVelocities.reduce((acc, y) => {
      const { success } = runSimulation(x, y, target);
      if (success) {
        acc.push({ x, y });
      }
      return acc;
    }, [])
  );
}

console.log(possibleVelocitiesOf(toTarget(readInput())).length);
