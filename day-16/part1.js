const input = require("./input.json");

const LITERAL = 4;

function decodePackets(binaryData, maxNumberOfPackets = Infinity) {
  const decodedPackets = [];

  let unparsedBinaryData = binaryData;
  while (unparsedBinaryData) {
    const { version, typeId } = headerOf(unparsedBinaryData);
    const body = bodyOf(unparsedBinaryData);

    if (typeId === LITERAL) {
      const { literal, packetSize } = decodeLiteralPacket(body);
      decodedPackets.push({ version, typeId, literal, packetSize });
      unparsedBinaryData = unparsedBinaryData.substring(packetSize);
    } else {
      const { subPackets, packetSize } = decodeOperatorPacket(body);
      decodedPackets.push({
        version,
        typeId,
        subPackets,
        packetSize,
      });
      unparsedBinaryData = unparsedBinaryData.substring(packetSize);
    }

    // Skip padding at the end
    if (!unparsedBinaryData.includes("1") && unparsedBinaryData.length <= 7) {
      unparsedBinaryData = "";
    }

    if (maxNumberOfPackets === decodedPackets.length) {
      return decodedPackets;
    }
  }

  return decodedPackets;
}

function headerOf(binaryData) {
  return {
    version: parseInt(binaryData.substring(0, 3), 2),
    typeId: parseInt(binaryData.substring(3, 6), 2),
  };
}

function bodyOf(binaryData) {
  return binaryData.substring(6);
}

function decodeLiteralPacket(body) {
  let literalBody = "";
  let unparsedBody = body;

  while (unparsedBody) {
    literalBody += unparsedBody.substring(0, 5);

    if (Number(unparsedBody[0]) === 1) {
      unparsedBody = unparsedBody.substring(5);
    } else if (Number(unparsedBody[0]) === 0) {
      unparsedBody = "";
    }
  }

  const headerSize = 6;
  const packetSize = headerSize + literalBody.length;

  const literal = parseInt(
    literalBody
      .split(/(\d{5})/)
      .filter((group) => group.length === 5)
      .map((group) => group.substring(1))
      .join(""),
    2
  );

  return { packetSize, literal };
}

function decodeOperatorPacket(body) {
  const lengthTypeId = Number(body.substring(0, 1));
  if (lengthTypeId === 0) {
    const totalLengthInBits = parseInt(body.substring(1, 16), 2);
    const encodedSubPackets = body.substring(16, 16 + totalLengthInBits);
    const subPackets = decodePackets(encodedSubPackets);
    return {
      subPackets,
      packetSize: 6 + 1 + 15 + totalLengthInBits,
    };
  } else if (lengthTypeId === 1) {
    const numberOfSubPackets = parseInt(body.substring(1, 12), 2);
    const encodedSubPackets = body.substring(12);
    const subPackets = decodePackets(encodedSubPackets, numberOfSubPackets);
    return {
      subPackets,
      packetSize:
        6 +
        1 +
        11 +
        subPackets.map(({ packetSize }) => packetSize).reduce(add, 0),
    };
  }
}

function add(accumulator, a) {
  return accumulator + a;
}

function hexToBinary(data) {
  return data
    .split("")
    .map((number) => parseInt(number, 16).toString(2).padStart(4, "0"))
    .join("");
}

function sumOfVersions(packets = []) {
  return packets.reduce((sum, packet) => {
    sum += packet.version;
    sum += sumOfVersions(packet.subPackets);
    return sum;
  }, 0);
}

//console.log(sumOfVersions(decodePackets(hexToBinary(input.transmission))));

module.exports = {
  decodePackets,
  hexToBinary,
  sumOfVersions,
};
