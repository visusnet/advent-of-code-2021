const {
  addSnailfishNumbers,
  reduceSnailfishNumbers,
  reduceSnailfishNumber,
  magnitudeOf,
} = require("./part1");

describe("Snailfish: Part I", () => {
  describe("addSnailfishNumbers", () => {
    it("should add two snailfish numbers", () => {
      expect(
        reduceSnailfishNumber([
          [1, 2],
          [[3, 4], 5],
        ])
      ).toEqual([
        [1, 2],
        [[3, 4], 5],
      ]);
    });

    describe("reduceSnailfishNumber", () => {});
    it("should reduce a snailfish number", () => {
      expect(
        reduceSnailfishNumber([
          [1, 2],
          [[3, 4], 5],
        ])
      ).toEqual([
        [1, 2],
        [[3, 4], 5],
      ]);
    });
  });

  describe("magnitudeOf", () => {
    it("should calculate magnitude of [[1,2],[[3,4],5]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [1, 2],
            [[3, 4], 5],
          ])
        )
      ).toEqual(143);
    });

    it("should calculate magnitude of [[[[0,7],4],[[7,8],[6,0]]],[8,1]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [
              [[0, 7], 4],
              [
                [7, 8],
                [6, 0],
              ],
            ],
            [8, 1],
          ])
        )
      ).toEqual(1384);
    });

    it("should calculate magnitude of [[[[1,1],[2,2]],[3,3]],[4,4]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [
              [
                [1, 1],
                [2, 2],
              ],
              [3, 3],
            ],
            [4, 4],
          ])
        )
      ).toEqual(445);
    });

    it("should calculate magnitude of [[[[3,0],[5,3]],[4,4]],[5,5]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [
              [
                [3, 0],
                [5, 3],
              ],
              [4, 4],
            ],
            [5, 5],
          ])
        )
      ).toEqual(791);
    });

    it("should calculate magnitude of [[[[5,0],[7,4]],[5,5]],[6,6]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [
              [
                [5, 0],
                [7, 4],
              ],
              [5, 5],
            ],
            [6, 6],
          ])
        )
      ).toEqual(1137);
    });

    it("should calculate magnitude of [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]", () => {
      expect(
        magnitudeOf(
          reduceSnailfishNumber([
            [
              [
                [8, 7],
                [7, 7],
              ],
              [
                [8, 6],
                [7, 7],
              ],
            ],
            [
              [
                [0, 7],
                [6, 6],
              ],
              [8, 7],
            ],
          ])
        )
      ).toEqual(3488);
    });
  });

  it("should calculate the magnitude of the final sum", () => {
    const snailfishNumbers = [
      [
        [
          [0, [5, 8]],
          [
            [1, 7],
            [9, 6],
          ],
        ],
        [
          [4, [1, 2]],
          [[1, 4], 2],
        ],
      ],
      [
        [[5, [2, 8]], 4],
        [5, [[9, 9], 0]],
      ],
      [
        6,
        [
          [
            [6, 2],
            [5, 6],
          ],
          [
            [7, 6],
            [4, 7],
          ],
        ],
      ],
      [
        [
          [6, [0, 7]],
          [0, 9],
        ],
        [4, [9, [9, 0]]],
      ],
      [
        [
          [7, [6, 4]],
          [3, [1, 3]],
        ],
        [[[5, 5], 1], 9],
      ],
      [
        [
          6,
          [
            [7, 3],
            [3, 2],
          ],
        ],
        [
          [
            [3, 8],
            [5, 7],
          ],
          4,
        ],
      ],
      [
        [
          [
            [5, 4],
            [7, 7],
          ],
          8,
        ],
        [[8, 3], 8],
      ],
      [
        [9, 3],
        [
          [9, 9],
          [6, [4, 9]],
        ],
      ],
      [
        [2, [[7, 7], 7]],
        [
          [5, 8],
          [
            [9, 3],
            [0, 2],
          ],
        ],
      ],
      [
        [
          [[5, 2], 5],
          [8, [3, 7]],
        ],
        [
          [5, [7, 5]],
          [4, 4],
        ],
      ],
    ];

    expect(magnitudeOf(reduceSnailfishNumbers(snailfishNumbers))).toEqual(4140);
  });
});
