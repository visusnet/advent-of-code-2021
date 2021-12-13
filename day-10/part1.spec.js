const { parseLine, parseProgram, calculatePoints } = require("./part1");

describe("Syntax Scoring: Part I", () => {
  const program = [
    "{([(<{}[<>[]}>{[]{[(<()>",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
  ];

  it("should expect ] but find } instead", () => {
    expect(parseLine(program[0]).error).toEqual({
      type: "syntaxError",
      expected: "]",
      found: "}",
    });
  });

  it("should expect ] but find ) instead", () => {
    expect(parseLine(program[1]).error).toEqual({
      type: "syntaxError",
      expected: "]",
      found: ")",
    });
  });

  it("should expect ) but find ] instead", () => {
    expect(parseLine(program[2]).error).toEqual({
      type: "syntaxError",
      expected: ")",
      found: "]",
    });
  });

  it("should expect > but find ) instead", () => {
    expect(parseLine(program[3]).error).toEqual({
      type: "syntaxError",
      expected: ">",
      found: ")",
    });
  });

  it("should expect ] but find > instead", () => {
    expect(parseLine(program[4]).error).toEqual({
      type: "syntaxError",
      expected: "]",
      found: ">",
    });
  });

  it("should find all 5 errors in the program", () => {
    expect(
      parseProgram(program).map((parserResult) => parserResult.error).length
    ).toBe(5);
  });

  it("should calculate points", () => {
    const parserResults = [
      { error: { type: "syntaxError", expected: "]", found: "}" } }, // 1197
      { error: { type: "syntaxError", expected: "]", found: ")" } }, // 3
      { error: { type: "syntaxError", expected: ")", found: "]" } }, // 57
      { error: { type: "syntaxError", expected: ">", found: ")" } }, // 3
      { error: { type: "syntaxError", expected: "]", found: ">" } }, // 25137
    ];

    expect(calculatePoints(parserResults)).toBe(3 + 3 + 57 + 1197 + 25137);
  });
});
