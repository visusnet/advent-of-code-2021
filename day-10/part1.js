const program = require("./input.json");

const OPENING_TOKENS = ["(", "[", "{", "<"];
const CLOSING_TOKENS = [")", "]", "}", ">"];
const INVALID_TOKEN_POINTS = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function parseLine(line) {
  const openingTokenStack = [];
  let error = null;
  for (const token of line) {
    if (OPENING_TOKENS.includes(token)) {
      openingTokenStack.push(token);
    } else {
      const relatedOpeningToken = OPENING_TOKENS[CLOSING_TOKENS.indexOf(token)];
      const lastOpeningToken = openingTokenStack[openingTokenStack.length - 1];
      const expectedCloseToken =
        CLOSING_TOKENS[OPENING_TOKENS.indexOf(lastOpeningToken)];

      if (lastOpeningToken === relatedOpeningToken) {
        openingTokenStack.pop();
      } else {
        error = {
          type: "syntaxError",
          found: token,
          expected: expectedCloseToken,
        };
        break;
      }
    }
  }

  return { openingTokenStack, error };
}

function parseProgram(program) {
  return program.map(parseLine);
}

function calculatePoints(parserResults) {
  return parserResults
    .reduce((corruptingTokens, parserResult) => {
      if (parserResult.error) {
        corruptingTokens.push(parserResult.error.found);
      }
      return corruptingTokens;
    }, [])
    .reduce((sum, token) => sum + INVALID_TOKEN_POINTS[token], 0);
}

//console.log(calculatePoints(parseProgram(program)));

module.exports = {
  parseLine,
  parseProgram,
  calculatePoints,
  OPENING_TOKENS,
  CLOSING_TOKENS,
};
