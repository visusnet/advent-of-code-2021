const fs = require("fs");
const path = require("path");

function readInput() {
  return fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .trim()
    .match(
      /target area: x=(([\-0-9]+)\.\.([\-0-9]+)), y=(([\-0-9]+)\.\.([\-0-9]+))/
    );
}

function toTarget(input) {
  return {
    start: {
      x: parseInt(input[2]),
      y: parseInt(input[5]),
    },
    end: {
      x: parseInt(input[3]),
      y: parseInt(input[6]),
    },
  };
}

function maxHeightOf(target) {
  const { maxHeight } = range(1, 100).reduce(
    ({ xVelocity, yVelocity, maxHeight }) => {
      const { success, x, highestY } = runSimulation(
        xVelocity,
        yVelocity,
        target
      );
      if (success) {
        maxHeight = Math.max(highestY, maxHeight);
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
      return { xVelocity, yVelocity, maxHeight };
    },
    { maxHeight: 0, xVelocity: 24, yVelocity: 80 }
  );
  return maxHeight;
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

function runSimulation(xVelocity, yVelocity, target) {
  let success;
  let x = 0;
  let y = 0;
  let highestY = 0;

  const minTargetX = Math.min(target.start.x, target.end.x);
  const minTargetY = Math.min(target.start.y, target.end.y);
  const maxTargetX = Math.max(target.start.x, target.end.x);
  const maxTargetY = Math.max(target.start.y, target.end.y);

  while (success === undefined) {
    x += xVelocity;
    y += yVelocity;
    if (y > highestY) {
      highestY = y;
    }
    if (xVelocity > 0) {
      xVelocity--;
    }
    yVelocity--;

    if (
      minTargetX <= x &&
      x <= maxTargetX &&
      minTargetY <= y &&
      maxTargetY >= y
    ) {
      success = true;
    }

    if (x > maxTargetX || y < minTargetY) {
      success = false;
    }
  }

  return {
    success,
    x,
    y,
    highestY,
  };
}

//console.log(maxHeightOf(toTarget(readInput())));

module.exports = { readInput, range, toTarget, runSimulation };
