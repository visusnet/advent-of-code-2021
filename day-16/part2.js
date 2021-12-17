const input = require("./input.json");
const { decodePackets, hexToBinary } = require("./part1");

const SUM = 0;
const PRODUCT = 1;
const MINIMUM = 2;
const MAXIMUM = 3;
const LITERAL = 4;
const GREATER_THAN = 5;
const LESS_THAN = 6;
const EQUAL_TO = 7;

function calculate(packet) {
  if (packet.typeId === SUM) {
    return packet.subPackets.map(calculate).reduce(add, 0);
  } else if (packet.typeId === PRODUCT) {
    return packet.subPackets.map(calculate).reduce(multiply, 1);
  } else if (packet.typeId === MINIMUM) {
    return packet.subPackets.map(calculate).reduce(minimum, Infinity);
  } else if (packet.typeId === MAXIMUM) {
    return packet.subPackets.map(calculate).reduce(maximum, -Infinity);
  } else if (packet.typeId === LITERAL) {
    return packet.literal;
  } else if (packet.typeId === GREATER_THAN) {
    return calculate(packet.subPackets[0]) > calculate(packet.subPackets[1])
      ? 1
      : 0;
  } else if (packet.typeId === LESS_THAN) {
    return calculate(packet.subPackets[0]) < calculate(packet.subPackets[1])
      ? 1
      : 0;
  } else if (packet.typeId === EQUAL_TO) {
    return calculate(packet.subPackets[0]) === calculate(packet.subPackets[1])
      ? 1
      : 0;
  }
}

function add(accumulator, a) {
  return accumulator + a;
}

function multiply(accumulator, a) {
  return accumulator * a;
}

function minimum(accumulator, a) {
  return Math.min(accumulator, a);
}

function maximum(accumulator, a) {
  return Math.max(accumulator, a);
}

console.log(calculate(decodePackets(hexToBinary(input.transmission))[0]));

module.exports = {
  calculate,
};
