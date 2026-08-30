import fs from "fs/promises";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const OUTPUT_FILE = "./pokemon.json";

async function fetchPokemon(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon ${id}: ${response.status}`);
  }

  const pokemon = await response.json();

  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((type) => type.type.name),
    abilities: pokemon.abilities.map((ability) => ({
      name: ability.ability.name,
      isHidden: ability.is_hidden,
    })),
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    sprites: {
      front: pokemon.sprites.front_default,
      officialArtwork:
        pokemon.sprites.other?.["official-artwork"]?.front_default ?? null,
    },
  };
}

async function main() {
  const response = await fetch(`${API_URL}?limit=1`);

  if (!response.ok) {
    throw new Error("Não foi possível acessar a PokéAPI");
  }

  const data = await response.json();
  const total = data.count;

  console.log(`Encontrados ${total} Pokémon.`);
  console.log("Baixando dados...");

  const pokemon = [];

  for (let id = 1; id <= 1000; id++) {
    try {
      const data = await fetchPokemon(id);

      pokemon.push(data);

      console.log(`[${id}/${total}] ${data.name}`);
    } catch (error) {
      console.error(`Erro no Pokémon ${id}:`, error.message);
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(pokemon, null, 2), "utf-8");

  console.log(`\nConcluído!`);
  console.log(`Arquivo salvo em: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
