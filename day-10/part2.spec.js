const { parseLine, parseProgram } = require("./part1");
const {
  onlyIncomplete,
  calculateCompletionPoints,
  middleScoreOf,
} = require("./part2");

describe("Day 10: Syntax Scoring: Part II", () => {
  const program = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "(((({<>}<{<{<>}{[]{[]{}",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ];

  it("should calculate points", () => {
    expect(
      calculateCompletionPoints(onlyIncomplete(parseProgram(program)))
    ).toEqual([288957, 5566, 1480781, 995444, 294]);
  });

  it("should select middle score", () => {
    expect(middleScoreOf([288957, 5566, 1480781, 995444, 294])).toBe(288957);
  });
});
