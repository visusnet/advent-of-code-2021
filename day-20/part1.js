const input = require("./input");

const PADDING = 2;

function applyAlgorithm(image, algorithm, numberOfEnhancements) {
  return range(1, numberOfEnhancements).reduce(
    (image) => enhanceImage(image, algorithm),
    pad(image, numberOfEnhancements)
  );
}

function enhanceImage(image, algorithm) {
  const [width, height] = [image[0].length - PADDING, image.length - PADDING];
  return range(1, height).map((rowIndex) =>
    range(1, width).map(
      (columnIndex) =>
        algorithm[toAlgorithmIndex(squareOf(image, rowIndex, columnIndex))]
    )
  );
}

function pad(image, numberOfEnhancements) {
  const paddingPerSide = numberOfEnhancements * PADDING;
  const padding = paddingPerSide * 2;
  return blankImageWith(image[0].length + padding, image.length + padding).map(
    (row, rowIndex) =>
      row.map(
        (pixel, columnIndex) =>
          image[rowIndex - paddingPerSide]?.[columnIndex - paddingPerSide] ??
          pixel
      )
  );
}

function unpad(image, numberOfEnhancements) {
  const paddingPerSide = numberOfEnhancements * PADDING;
  const paddingOffset = paddingPerSide / 2;
  const [width, height] = [image[0].length - 1, image.length - 1];
  const rowDimensions = [paddingOffset, height - paddingOffset];
  const columnDimensions = [paddingOffset, width - paddingOffset];
  return image
    .filter(inDimensions(rowDimensions))
    .map((row) => row.filter(inDimensions(columnDimensions)));
}

function inDimensions(dimensions) {
  return (_, index) => dimensions[0] <= index && index <= dimensions[1];
}

function blankImageWith(width, height) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ".")
  );
}

function squareOf(image, rowIndex, columnIndex) {
  return [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1],
  ].map(([y, x]) => image[y]?.[x] ?? ".");
}

function toAlgorithmIndex(square) {
  return parseInt(
    square.map((pixel) => (pixel === "#" ? "1" : "0")).join(""),
    2
  );
}

function litPixelsOf(image) {
  return image
    .flat()
    .reduce((sum, pixel) => (pixel === "#" ? sum + 1 : sum), 0);
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
}

//console.log(litPixelsOf(applyAlgorithm(input.image, input.algorithm, 2)));

module.exports = {
  applyAlgorithm,
  litPixelsOf,
  pad,
  unpad,
};
