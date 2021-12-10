const program = require("./input");
const { parseProgram, OPENING_TOKENS, CLOSING_TOKENS } = require("./part1");

const COMPLETION_TOKEN_POINTS = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function onlyIncomplete(parserResults) {
  return parserResults.reduce((incompleteTokenStacks, parserResult, i) => {
    if (!parserResult.error) {
      incompleteTokenStacks.push(parserResult.openingTokenStack);
    }
    return incompleteTokenStacks;
  }, []);
}

function calculateCompletionPoints(incompleteTokenStacks) {
  return incompleteTokenStacks.reduce(
    (incompleteLinePoints, incompleteTokenStack) => {
      const closeOrder = incompleteTokenStack.reverse().map((char) => {
        const openIndex = OPENING_TOKENS.indexOf(char);
        return CLOSING_TOKENS[openIndex];
      });

      const completionPoints = closeOrder.reduce(
        (sum, char) => sum * 5 + COMPLETION_TOKEN_POINTS[char],
        0
      );
      incompleteLinePoints.push(completionPoints);
      return incompleteLinePoints;
    },
    []
  );
}

function middleScoreOf(scores) {
  return scores.slice().sort((a, b) => b - a)[Math.floor(scores.length / 2)];
}

console.log(
  middleScoreOf(
    calculateCompletionPoints(onlyIncomplete(parseProgram(program)))
  )
);

module.exports = { onlyIncomplete, calculateCompletionPoints, middleScoreOf };
