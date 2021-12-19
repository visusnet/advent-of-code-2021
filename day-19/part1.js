const input = require("./input.json");

const rotates = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [-z, -y, -x],
  ([x, y, z]) => [-y, -x, -z],
];

function transform(scanner, { rotate, distance }) {
  return scanner.map((beacon) => {
    return rotate(beacon).map((coordinate, i) => {
      return coordinate + distance[i];
    });
  });
}

function addOverlapPathToOrigin(transformations) {
  while (transformations.some((transformation) => !transformation[0])) {
    for (let i = 1; i < transformations.length; i++) {
      if (transformations[i][0]) {
        continue;
      }

      for (const j in transformations[i]) {
        if (!transformations[j][0]) {
          continue;
        }

        transformations[i][0] = transformations[i][j].concat(
          transformations[j][0]
        );
        break;
      }
    }
  }

  return transformations;
}

function uniqueBeaconsOf(scanners, transformations) {
  return [
    ...new Set(
      scanners
        .map((scanner, scannerIndex) =>
          scannerIndex === 0
            ? scanner
            : transformations[scannerIndex][0].reduce(transform, scanner)
        )
        .flatMap((scanner) => scanner.map((beacon) => beacon.join()))
    ),
  ].map((beaconKey) => beaconKey.split(",").map(Number));
}

function toTransformations(
  transformations,
  [scanner1, scanner2, scanner1Index, scanner2Index]
) {
  if (!transformations[scanner1Index]) {
    transformations[scanner1Index] = [];
  }

  if (scanner1Index === 0 && scanner2Index === 0) {
    transformations[scanner1Index][scanner2Index] = [
      {
        rotate: rotates[0],
        distance: [0, 0, 0],
      },
    ];
  }

  if (scanner1Index === scanner2Index) {
    return transformations;
  }

  rotates.forEach((rotate) => {
    const countsPerDistanceKey = {};
    cartesianProductOf(scanner1, scanner2).forEach(([beacon1, beacon2]) => {
      const distance = distanceOf(rotate(beacon1), beacon2);
      const distanceKey = distance.join();
      countsPerDistanceKey[distanceKey] =
        (countsPerDistanceKey[distanceKey] ?? 0) + 1;

      if (countsPerDistanceKey[distanceKey] === 12) {
        transformations[scanner1Index][scanner2Index] = [
          {
            rotate,
            distance,
          },
        ];
      }
    });
  });
  return transformations;
}

function distanceOf([x1, y1, z1], [x2, y2, z2]) {
  return [x2 - x1, y2 - y1, z2 - z1];
}

function pairsOf(list) {
  return list.flatMap((value, index) =>
    list.map((otherValue, otherIndex) => [value, otherValue, index, otherIndex])
  );
}

function cartesianProductOf(listA, listB) {
  return listA.reduce(
    (cartesianProduct, elementA) => [
      ...cartesianProduct,
      ...listB.map((elementB) => [elementA, elementB]),
    ],
    []
  );
}

//console.log(
//  uniqueBeaconsOf(
//    input,
//    addOverlapPathToOrigin(pairsOf(input).reduce(toTransformations, []))
//  ).length
//);

module.exports = {
  addOverlapPathToOrigin,
  pairsOf,
  toTransformations,
  transform,
};
