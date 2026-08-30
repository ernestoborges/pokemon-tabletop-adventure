import fs from "fs/promises";

const INPUT = "src/db/pta-pokemon-data/skills.json";
const OUTPUT = "src/db/scripts/output/skills.json";

function normalizeData(data) {
  return {
    name: data["Skill Name"],
    description: data["Skill Effect"],
    summary: data["Summary"],
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
