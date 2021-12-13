const { toPaper, fold, toText } = require("./part1");

describe("Transparent Origami: Part I", () => {
  describe("toPaper", () => {
    it("should fill a paper with dots", () => {
      expect(
        toPaper([
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ])
      ).toEqual([
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ]);
    });
  });

  describe("fold", () => {
    it("should fold along y = 3", () => {
      expect(
        fold(
          [
            [true, false, false],
            [false, true, false],
            [false, false, false],
            [true, false, true],
          ],
          { foldDirection: "y", position: 3 }
        )
      ).toEqual([
        [true, false, false],
        [false, true, false],
        [true, false, true],
      ]);
    });

    it("should fold along y = 7", () => {
      expect(
        toText(
          fold(
            fromText(`
            ...#..#..#.
            ....#......
            ...........
            #..........
            ...#....#.#
            ...........
            ...........
            ...........
            ...........
            .#....#.##.
            ....#......
            ......#...#
            #..........
            #.#........
            `),
            { foldDirection: "y", position: 7 }
          )
        )
      ).toEqual(
        toText(
          fromText(`
          #.##..#..#.
          #...#......
          ......#...#
          #...#......
          .#.#..#.###
          ...........
          ...........
          `)
        )
      );
    });

    it("should fold along x = 5", () => {
      expect(
        toText(
          fold(
            fromText(`
            #.##..#..#.
            #...#......
            ......#...#
            #...#......
            .#.#..#.###
            ...........
            ...........
            `),
            { foldDirection: "x", position: 5 }
          )
        )
      ).toEqual(
        toText(
          fromText(`
          #####
          #...#
          #...#
          #...#
          #####
          .....
          .....
          `)
        )
      );
    });
  });
});

function fromText(text) {
  return text
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split("")
        .map((char) => (char === "#" ? true : false))
    );
}
