const { decodePackets, hexToBinary, sumOfVersions } = require("./part1");

describe("Packet Decoder: Part I", () => {
  describe("decodePackets", () => {
    it("should parse literal packet", () => {
      expect(decodePackets("110100101111111000101000")).toEqual([
        { typeId: 4, version: 6, packetSize: 21, literal: 2021 },
      ]);
    });

    it("should parse operator packet with fixed size sub packets", () => {
      expect(
        decodePackets(
          "00111000000000000110111101000101001010010001001000000000"
        )
      ).toEqual([
        {
          typeId: 6,
          version: 1,
          packetSize: 49,
          subPackets: [
            { typeId: 4, version: 6, packetSize: 11, literal: 10 },
            { typeId: 4, version: 2, packetSize: 16, literal: 20 },
          ],
        },
      ]);
    });

    it("should parse operator packet with fixed number of sub packets", () => {
      expect(
        decodePackets(
          "11101110000000001101010000001100100000100011000001100000"
        )
      ).toEqual([
        {
          typeId: 3,
          version: 7,
          packetSize: 51,
          subPackets: [
            { typeId: 4, version: 2, packetSize: 11, literal: 1 },
            { typeId: 4, version: 4, packetSize: 11, literal: 2 },
            { typeId: 4, version: 1, packetSize: 11, literal: 3 },
          ],
        },
      ]);
    });

    it("should parse example 8A004A801A8002F478", () => {
      expect(decodePackets(hexToBinary("8A004A801A8002F478"))).toEqual([
        {
          typeId: 2,
          version: 4,
          packetSize: 69,
          subPackets: [
            {
              typeId: 2,
              version: 1,
              packetSize: 51,
              subPackets: [
                {
                  typeId: 2,
                  version: 5,
                  packetSize: 33,
                  subPackets: [
                    { typeId: 4, version: 6, packetSize: 11, literal: 15 },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    });

    it("should calculate sum of all packet versions of example 8A004A801A8002F478", () => {
      expect(
        sumOfVersions(decodePackets(hexToBinary("8A004A801A8002F478")))
      ).toEqual(16);
    });

    it("should calculate sum of all packet versions of example 620080001611562C8802118E34", () => {
      expect(
        sumOfVersions(decodePackets(hexToBinary("620080001611562C8802118E34")))
      ).toEqual(12);
    });

   it("should calculate sum of all packet versions of example C0015000016115A2E0802F182340", () => {
      expect(
        sumOfVersions(
          decodePackets(hexToBinary("C0015000016115A2E0802F182340"))
        )
      ).toEqual(23);
    });

    it("should calculate sum of all packet versions of example A0016C880162017C3686B18A3D4780", () => {
      expect(
        sumOfVersions(
          decodePackets(hexToBinary("A0016C880162017C3686B18A3D4780"))
        )
      ).toEqual(31);
    });
  });
});
