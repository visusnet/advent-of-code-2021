const input = require("./input.json");

function calculatePosition(commands) {
  return commands.reduce(
    (previousValue, currentValue) => ({
      horizontal:
        currentValue[0] === "forward"
          ? previousValue.horizontal + currentValue[1]
          : previousValue.horizontal,
      depth:
        currentValue[0] === "up"
          ? previousValue.depth - currentValue[1]
          : currentValue[0] === "down"
          ? previousValue.depth + currentValue[1]
          : previousValue.depth,
    }),
    { horizontal: 0, depth: 0 }
  );
}

const position = calculatePosition(input);

console.log(position.horizontal * position.depth);

module.exports = {
  calculatePosition,
};
