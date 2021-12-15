const input = require("./input.json");

function createPolymer(polymerTemplate, insertions) {
  const counts = insert(polymerTemplate, insertions, 40);

  const values = Object.values(counts);
  const leastCommon = Math.min(...values);
  const mostCommon = Math.max(...values);

  return mostCommon - leastCommon;
}

function insert(polymerTemplate, insertions, iterations) {
  const pairCounts = toPairCounts(polymerTemplate);
  const letterCounts = toLetterCounts(polymerTemplate);
  const insertionEntries = Object.entries(insertions);

  range(1, iterations).forEach(() => {
    const { patches, inserts } = insertionEntries.reduce(
      ({ patches, inserts }, [pair, insertion]) => {
        if (pairCounts[pair]) {
          const pairCount = pairCounts[pair];

          const [letterA, letterB] = pair;
          const keyA = letterA + insertion;
          const keyB = insertion + letterB;

          inserts[insertion] = inserts[insertion]
            ? inserts[insertion] + pairCount
            : pairCount;
          patches[keyA] = patches[keyA] ? patches[keyA] + pairCount : pairCount;
          patches[keyB] = patches[keyB] ? patches[keyB] + pairCount : pairCount;
          patches[pair] = patches[pair]
            ? patches[pair] - pairCount
            : -pairCount;
        }
        return { patches, inserts };
      },
      { patches: {}, inserts: {} }
    );

    Object.entries(patches).forEach(([pair, patch]) => {
      pairCounts[pair] = pairCounts[pair] ? pairCounts[pair] + patch : patch;
    });

    Object.entries(inserts).forEach(([letter, insertion]) => {
      letterCounts[letter] = letterCounts[letter]
        ? letterCounts[letter] + insertion
        : insertion;
    });

    Object.entries(pairCounts).forEach(([pair, count]) => {
      if (!count) {
        delete pairCounts[pair];
      }
    });
  });

  return letterCounts;
}

function toPairCounts(polymer) {
  return polymer.split("").reduce((pairCounts, letter, letterIndex) => {
    if (letterIndex < polymer.length - 1) {
      const key = `${letter}${polymer[letterIndex + 1]}`;
      pairCounts[key] = pairCounts[key] ? pairCounts[key] + 1 : 1;
    }
    return pairCounts;
  }, {});
}

function toLetterCounts(polymerTemplate) {
  return polymerTemplate.split("").reduce((letterCounts, letter) => {
    letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
    return letterCounts;
  }, {});
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

console.log(createPolymer(input.polymerTemplate, input.insertions));
