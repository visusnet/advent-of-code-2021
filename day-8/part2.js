const input = require("./input.json");

function sumOfAllDecodedOutputValues(entries) {
  return entries
    .map(({ signalPatterns, outputValue }) =>
      decodeOutputValue(
        outputValue,
        determineWireSegmentConnections(signalPatterns)
      )
    )
    .reduce(add, 0);
}

function decodeOutputValue(outputValue, wireSegmentConnections) {
  return parseInt(
    outputValue.map(decodeDigitWith(wireSegmentConnections)).join(""),
    10
  );
}

function decodeDigitWith(wireSegmentConnections) {
  return (encodedDigit) =>
    wireSegmentConnections.findIndex(
      (wireSegmentConnection) =>
        encodedDigit.length === wireSegmentConnection.length &&
        containsAllOf(encodedDigit)(wireSegmentConnection)
    );
}

function determineWireSegmentConnections(signalPatterns) {
  const one = signalPatterns.find(withLength(2));
  const four = signalPatterns.find(withLength(4));
  const seven = signalPatterns.find(withLength(3));
  const eight = signalPatterns.find(withLength(7));

  // 2, 3, 5 are the only digits that have 5 segments
  const signalPatternsOfDigitsWithFiveSegments = signalPatterns.filter(
    withLength(5)
  );
  // 0, 6, 9 are the only digits that have 6 segments
  const signalPatternsOfDigitsWithSixSegments = signalPatterns.filter(
    withLength(6)
  );

  // 6 is the only digit that has 6 segments that contains only one signal of 1
  const six = signalPatternsOfDigitsWithSixSegments.find(
    containsSomeButNotAllOf(one)
  );
  // 3 is the only digit that has 5 segments that contains all signals of 1
  const three = signalPatternsOfDigitsWithFiveSegments.find(containsAllOf(one));
  // 9 is the only digit that has 6 segments that contains all signals of 4
  const nine = signalPatternsOfDigitsWithSixSegments.find(containsAllOf(four));
  // 0 is the remaining digit that has 6 segments (i.e. is not 6 nor 9)
  const zero = signalPatternsOfDigitsWithSixSegments.find(isNot(six, nine));

  const signalPatternsOfDigitsWithFiveSegmentsButNotThree =
    signalPatternsOfDigitsWithFiveSegments.filter(isNot(three));

  // 2 is the only digit that has 5 segments that contains 2 signals of 4 but is not 3.
  const two = signalPatternsOfDigitsWithFiveSegmentsButNotThree.find(
    sharesNumberOfSignalsWith(2, four)
  );
  // 5 is the only digit that has 5 segments that is not 2 or 3.
  const five = signalPatternsOfDigitsWithFiveSegments.find(isNot(two, three));

  return [zero, one, two, three, four, five, six, seven, eight, nine];
}

function withLength(length) {
  return (signalPattern) => signalPattern.length === length;
}

function containsSomeButNotAllOf(otherSignalPattern) {
  return (signalPattern) =>
    !toSignals(otherSignalPattern).every((signal) =>
      signalPattern.includes(signal)
    );
}

function containsAllOf(otherSignalPattern) {
  return (signalPattern) =>
    toSignals(otherSignalPattern).every((signal) =>
      signalPattern.includes(signal)
    );
}

function isNot(...otherSignalPatterns) {
  return (signalPattern) =>
    otherSignalPatterns.every(
      (otherSignalPattern) => otherSignalPattern !== signalPattern
    );
}

function sharesNumberOfSignalsWith(numberOfSharedSignals, otherSignalPattern) {
  const otherSignals = toSignals(otherSignalPattern);
  return (signalPattern) =>
    intersection(toSignals(signalPattern), otherSignals).length ===
    numberOfSharedSignals;
}

function toSignals(signalPattern) {
  return signalPattern.split("");
}

function intersection(array1, array2) {
  return array1.filter((element) => array2.indexOf(element) !== -1);
}

function add(accumulator, a) {
  return accumulator + a;
}

console.log(sumOfAllDecodedOutputValues(input));
