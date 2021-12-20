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
    range(1, width).map((columnIndex) => {
      return algorithm[
        toAlgorithmIndex(squareOf(image, rowIndex, columnIndex))
      ];
    })
  );
}

function pad(image, numberOfEnhancements) {
  const padding = PADDING * numberOfEnhancements;
  const blankImage = blankImageWith(
    image[0].length + 2 * padding,
    image.length + 2 * padding
  );

  return blankImage.map((row, rowIndex) =>
    row.map((pixel, columnIndex) =>
      image[rowIndex - padding] &&
      image[rowIndex - padding][columnIndex - padding]
        ? image[rowIndex - padding][columnIndex - padding]
        : pixel
    )
  );
}

function unpad(image, numberOfEnhancements) {
  const padding = numberOfEnhancements * PADDING;
  const paddingPerSide = padding / 2;
  const [width, height] = [image[0].length - 1, image.length - 1];
  const rowDimensions = [paddingPerSide, height - paddingPerSide];
  const columnDimensions = [paddingPerSide, width - paddingPerSide];
  const inDimensions = (dimensions) => (_, index) =>
    dimensions[0] <= index && index <= dimensions[1];
  return image
    .map((row) => row.filter(inDimensions(columnDimensions)))
    .filter(inDimensions(rowDimensions));
}

function blankImageWith(width, height) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ".")
  );
}

function squareOf(image, rowIndex, columnIndex) {
  const squareCoordinates = [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1],
  ];

  return squareCoordinates.map(([y, x]) =>
    image[y] && image[y][x] ? image[y][x] : "."
  );
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
