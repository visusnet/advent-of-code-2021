const { rollDice } = require("./part1");

describe("Dirac Dice: Part I", () => {
  describe("rollDice", () => {
    it("should return 1 ... 100", () => {
      const dice = rollDice();

      for (let eyes = 1; eyes <= 100; eyes++) {
        expect(dice.next().value.eyes).toEqual(eyes);
      }
    });

    it("should return the number of rolls", () => {
      const dice = rollDice();

      let result;

      for (let eyes = 1; eyes <= 234; eyes++) {
        result = dice.next();
      }

      expect(result.value.numberOfRolls).toEqual(234);
    });
  });
});
