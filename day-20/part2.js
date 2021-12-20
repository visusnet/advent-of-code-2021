const input = require("./input");
const { litPixelsOf, applyAlgorithm } = require("./part1");

console.log(litPixelsOf(applyAlgorithm(input.image, input.algorithm, 50)));
