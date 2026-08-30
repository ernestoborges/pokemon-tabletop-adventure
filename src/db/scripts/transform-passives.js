import fs from "fs/promises";

const INPUT = "src/db/pta-pokemon-data/passives.json";
const OUTPUT = "src/db/scripts/output/passives.json";

const STAT_PASSIVES = "src/db/pta-pokemon-data/stat_passives.json";
const statPassives = JSON.parse(await fs.readFile(STAT_PASSIVES, "utf8"));

function normalizeData(data) {
  return {
    name: data["Passive Name"],
    description: data["Passive Effect"],
  };
}

async function main() {
  const rawData = JSON.parse(await fs.readFile(INPUT, "utf8"));

  const normalizedData = rawData
    .filter((passive) => {
      const statPassive = statPassives.find(
        (sp) => sp["Stat Passives"] === passive["Passive Name"],
      );
      return !statPassive;
    })
    .map(normalizeData);

  await fs.writeFile(OUTPUT, JSON.stringify(normalizedData, null, 2), "utf8");

  console.log(`✓ ${normalizedData.length} itens normalizados`);

  console.log(`✓ Arquivo: ${OUTPUT}`);
}

main().catch(console.error);
