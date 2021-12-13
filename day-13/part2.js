const input = require("./input.json");
const { fold, toPaper, toText } = require("./part1");

const paper = input.instructions.reduce(
  (p, instruction) => fold(p, instruction),
  toPaper(input.dots)
);
console.log(toText(paper));
