const input = require("./input.json");

function fold(paper, instruction) {
  const side = sideOf(paper, instruction);
  const foldedSide = foldedSideOf(paper, instruction);
  const reversedSide = side.map(reverse(instruction));
  const [width, height] = dimensionsOf(side, foldedSide, paper, instruction);
  const foldedPaper = emptyPaper(width, height)
    .map(mergeSides(reversedSide, foldedSide))
    .map(reverse(instruction));
  return foldedPaper;
}

function sideOf(paper, instruction) {
  return instruction.foldDirection === "x"
    ? paper.map((row) => row.slice(0, instruction.position))
    : paper.slice(0, instruction.position);
}

function foldedSideOf(paper, instruction) {
  return instruction.foldDirection === "x"
    ? paper.map((row) => row.slice(instruction.position + 1))
    : paper.slice(instruction.position);
}

function dimensionsOf(side, foldedSide, paper, instruction) {
  return instruction.foldDirection === "x"
    ? [Math.max(side[0].length, foldedSide[0].length), paper.length]
    : [side[0].length, Math.max(side.length, foldedSide.length)];
}

function reverse(instruction) {
  return instruction.foldDirection === "x"
    ? (row) => row.reverse()
    : (_, rowIndex, paper) => paper[paper.length - rowIndex - 1];
}

function mergeSides(side1, side2) {
  return (row, y) =>
    row.map(
      (_, x) =>
        (Boolean(side1[y]) && side1[y][x]) || (Boolean(side2[y]) && side2[y][x])
    );
}

function toPaper(dots) {
  const { maxX, maxY } = max(dots);
  return dots.reduce((paper, { x, y }) => {
    paper[y][x] = true;
    return paper;
  }, emptyPaper(maxX + 1, maxY + 1));
}

function emptyPaper(width, height) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );
}

function max(dots) {
  return dots.reduce(
    ({ maxX, maxY }, { x, y }) => ({
      maxX: Math.max(maxX, x),
      maxY: Math.max(maxY, y),
    }),
    { maxX: 0, maxY: 0 }
  );
}

function add(accumulator, a) {
  return accumulator + a;
}

function toText(paper) {
  return paper
    .map((row) => row.map((isDot) => (isDot ? "#" : ".")).join(""))
    .join("\n");
}

//const paper = fold(toPaper(input.dots), input.instructions[0]);
//console.log(toText(paper));
//console.log(paper.flatMap((isDot) => (isDot ? 1 : 0)).reduce(add, 0));

module.exports = {
  fold,
  toPaper,
  toText,
};
