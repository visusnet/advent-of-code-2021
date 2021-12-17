const { decodePackets, hexToBinary } = require("./part1");
const { calculate } = require("./part2");

describe("Packet Decoder: Part II", () => {
  describe("calculate", () => {
    it("should find the sum of 1 and 2", () => {
      expect(calculate(decodePackets(hexToBinary("C200B40A82"))[0])).toEqual(3);
    });

    it("should find the product of 6 and 9", () => {
      expect(calculate(decodePackets(hexToBinary("04005AC33890"))[0])).toEqual(
        54
      );
    });

    it("should find the minimum of 7, 8 and 9", () => {
      expect(
        calculate(decodePackets(hexToBinary("880086C3E88112"))[0])
      ).toEqual(7);
    });

    it("should find the minimum of 7, 8 and 9", () => {
      expect(
        calculate(decodePackets(hexToBinary("CE00C43D881120"))[0])
      ).toEqual(9);
    });

   it("should produce 1 because 5 is less than 15", () => {
      expect(calculate(decodePackets(hexToBinary("D8005AC2A8F0"))[0])).toEqual(
        1
      );
    });

    it("should produce 0 because 5 is not greater than 15", () => {
      expect(calculate(decodePackets(hexToBinary("F600BC2D8F"))[0])).toEqual(0);
    });

    it("should produce 0 because 5 is not equal to 15", () => {
      expect(calculate(decodePackets(hexToBinary("9C005AC2F8F0"))[0])).toEqual(
        0
      );
    });

    it("should produce 1 because 1 + 3 = 2 * 2", () => {
      expect(
        calculate(decodePackets(hexToBinary("9C0141080250320F1802104A08"))[0])
      ).toEqual(1);
    });
  });
});
