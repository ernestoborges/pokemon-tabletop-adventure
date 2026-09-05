import fs from "fs/promises";

const INPUT = "src/db/pokemons.json";
const OUTPUT = "src/db/scripts/output/habitats.json";

function normalizeData(data) {
  const habitats = new Set();

  data.forEach((pokemon) => {
    if (pokemon.habitats) {
      pokemon.habitats.forEach((habitat) => {
        const normalizedHabitat = habitat.trim();
        if (normalizedHabitat) {
          habitats.add(normalizedHabitat);
        }
      });
    }
  });

  const response = Array.from(habitats).map((habitat) => ({ name: habitat }));
  return response;
}

async function main() {
  const rawData = JSON.parse(await fs.readFile(INPUT, "utf8"));

  const normalizedData = normalizeData(rawData);

  await fs.writeFile(OUTPUT, JSON.stringify(normalizedData, null, 2), "utf8");
}

main().catch(console.error);
