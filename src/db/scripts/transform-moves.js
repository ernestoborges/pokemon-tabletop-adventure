import fs from "fs/promises";

const INPUT = "src/db/pta-pokemon-data/moves.json";
const OUTPUT = "src/db/scripts/output/moves.json";

function normalizeData(data) {
  return {
    name: data["Name"],
    frequency: data["Frequency"],
    range: data["Range"],
    type: data["Type"],
    category: data["Atk/Special/Effect"],
    damage: {
      dieNumber: data["Damage Die Number"]
        ? Number(data["Damage Die Number"])
        : null,
      die:
        data["Damage Die"] === "dM"
          ? `d${data["Damage Die"].split("d")[1]}`
          : data["Damage Die"] || null,
    },
    text: data["Text"],
    grantedSkills: data["Granted Skills"]
      ? data["Granted Skills"].split(",").map((skill) => skill.trim())
      : [],
    contest: {
      stat: data["Contest Stat"] || null,
      keyword: data["Contest Keyword"] || null,
    },
    frequencyCategory: data["FreqCategory"] || null,
    rangeCategory: data["RangeCategory"] || null,
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
