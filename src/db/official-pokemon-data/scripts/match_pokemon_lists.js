import fs from "fs/promises";

const LIST_1 = "../pokemons.json";
const LIST_2 = "./pokemons.json";
const OUTPUT = "./unmatched.json";

function normalizeName(name) {
  return name.toLowerCase().trim();
}

async function main() {
  const list1 = JSON.parse(await fs.readFile(LIST_1, "utf-8"));

  const list2 = JSON.parse(await fs.readFile(LIST_2, "utf-8"));

  const officialNames = new Set(
    list2.map((pokemon) => normalizeName(pokemon.name)),
  );

  const unmatched = list1
    .filter((pokemon) => {
      return !officialNames.has(normalizeName(pokemon.Pokemon));
    })
    .map((pokemon) => pokemon.Pokemon);

  await fs.writeFile(OUTPUT, JSON.stringify(unmatched, null, 2), "utf-8");

  console.log(`${unmatched.length} Pokémon sem match.`);
  console.log(`Arquivo salvo em: ${OUTPUT}`);
}

main().catch(console.error);
