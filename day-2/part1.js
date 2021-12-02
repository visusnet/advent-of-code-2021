const input = require("./input.json");

const position = input.reduce(
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

console.log(position.horizontal * position.depth);
