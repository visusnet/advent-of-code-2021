const input = require("./input.json");

function createPolymer(polymerTemplate, insertions) {
  const polymer = range(1, 10).reduce(insert(insertions), polymerTemplate);

  const numberOfLetters = numberOfLettersOf(polymer);
  const values = Object.values(numberOfLetters);
  const leastCommon = Math.min(...values);
  const mostCommon = Math.max(...values);
  return mostCommon - leastCommon;
}

function insert(insertions) {
  return (polymer) => {
    return polymer
      .split("")
      .reduce(toPairs(polymer), [])
      .map(withInsertions(insertions))
      .reduce(joinOverlapping);
  };
}

function joinOverlapping(pairs, pairWithInsertion) {
  return pairs + pairWithInsertion.slice(1);
}

function withInsertions(insertions) {
  return (pair) =>
    insertions[pair] ? pair[0] + insertions[pair] + pair[1] : undefined;
}

function toPairs(polymer) {
  return (p, letter, letterIndex) => {
    if (letterIndex < polymer.length - 1) {
      p.push(letter + polymer[letterIndex + 1]);
    }
    return p;
  };
}

function numberOfLettersOf(polymer) {
  return polymer.split("").reduce((numberOfLetters, cur) => {
    numberOfLetters[cur] = numberOfLetters[cur] ? numberOfLetters[cur] + 1 : 1;
    return numberOfLetters;
  }, {});
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(createPolymer(input.polymerTemplate, input.insertions));
