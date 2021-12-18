const input = require("./input.json");

function addSnailfishNumbers(a, b) {
  return [a, b];
}

function reduceSnailfishNumbers(snailfishNumbers) {
  return snailfishNumbers.reduce((reducedSnailfishNumber, number) =>
    reduceSnailfishNumber(addSnailfishNumbers(reducedSnailfishNumber, number))
  );
}

function reduceSnailfishNumber(snailfishNumber) {
  snailfishNumber = clone(snailfishNumber);
  while (true) {
    const paths = traverse(snailfishNumber);
    if (paths.find((p) => p.length > 4)) {
      snailfishNumber = explode(snailfishNumber, paths);
    } else if (paths.find((p) => getValueAt(snailfishNumber, p) > 9)) {
      snailfishNumber = split(snailfishNumber, paths);
    } else {
      return snailfishNumber;
    }
  }
}

function magnitudeOf(snailfishNumber) {
  return !Array.isArray(snailfishNumber)
    ? snailfishNumber
    : 3 * magnitudeOf(snailfishNumber[0]) + 2 * magnitudeOf(snailfishNumber[1]);
}

function getValueAt(snailfishNumber, path) {
  return path.reduce((s, i) => s[i], snailfishNumber);
}

function setValueAt(snailfishNumber, path, value) {
  while (path.length > 1) {
    snailfishNumber = snailfishNumber[path.shift()];
  }
  snailfishNumber[path[0]] = value;
}

function traverse(snailfishNumber) {
  const path = [0];
  const paths = [];
  while (path.length > 0) {
    if (Array.isArray(getValueAt(snailfishNumber, path))) {
      path.push(0);
    } else {
      paths.push([...path]);
      while (path.at(-1) == 1) {
        path.pop();
      }
      path[path.length - 1] = 1;
    }
  }
  return paths;
}

function explode(snailfishNumber, paths) {
  const targetIndex = paths.findIndex((p) => p.length > 4);
  const targetPath = paths[targetIndex];
  targetPath.pop();
  const [leftPath, rightPath] = [
    paths?.[targetIndex - 1],
    paths?.[targetIndex + 2],
  ];

  if (leftPath) {
    setValueAt(
      snailfishNumber,
      leftPath,
      getValueAt(snailfishNumber, [...targetPath, 0]) +
        getValueAt(snailfishNumber, leftPath)
    );
  }
  if (rightPath) {
    setValueAt(
      snailfishNumber,
      rightPath,
      getValueAt(snailfishNumber, [...targetPath, 1]) +
        getValueAt(snailfishNumber, rightPath)
    );
  }
  setValueAt(snailfishNumber, targetPath, 0);
  return snailfishNumber;
}

function split(snailfishNumber, paths) {
  const targetIndex = paths.findIndex(
    (path) => getValueAt(snailfishNumber, path) > 9
  );
  const number = getValueAt(snailfishNumber, paths[targetIndex]);
  setValueAt(snailfishNumber, paths[targetIndex], [
    Math.floor(number / 2),
    Math.ceil(number / 2),
  ]);
  return snailfishNumber;
}

function clone(array) {
  return JSON.parse(JSON.stringify(array));
}

//console.log(magnitudeOf(reduceSnailfishNumbers(input)));

module.exports = {
  addSnailfishNumbers,
  reduceSnailfishNumbers,
  reduceSnailfishNumber,
  magnitudeOf,
};
