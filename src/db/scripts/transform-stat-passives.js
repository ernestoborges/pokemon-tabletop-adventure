import fs from "fs/promises";

const INPUT = "src/db/pta-pokemon-data/stat_passives.json";
const OUTPUT = "src/db/scripts/output/stat_passives.json";

const PASSIVES = "src/db/pta-pokemon-data/passives.json";
const passives = JSON.parse(await fs.readFile(PASSIVES, "utf8"));

function parseNumber(value) {
  if (value === "" || value == null) {
    return null;
  }

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
}

function normalizeData(data) {
  const description = passives.find(
    (passive) => passive["Passive Name"] === data["Stat Passives"],
  )?.["Passive Effect"];

  return {
    name: data["Stat Passives"],
    description: description,
    bonus: {
      atk: parseNumber(data["Attack"]),
      def: parseNumber(data["Defense"]),
      spatk: parseNumber(data["Special Attack"]),
      spdef: parseNumber(data["Special Defense"]),
      hp: parseNumber(data["Hp"]),
      speed: parseNumber(data["Speed"]),
    },
  };
}

async function main() {
  const rawData = JSON.parse(await fs.readFile(INPUT, "utf8"));

  const normalizedData = rawData.map(normalizeData);

  await fs.writeFile(OUTPUT, JSON.stringify(normalizedData, null, 2), "utf8");

  console.log(`✓ ${normalizedData.length} itens normalizados`);

  console.log(`✓ Arquivo: ${OUTPUT}`);
}

main().catch(console.error);
