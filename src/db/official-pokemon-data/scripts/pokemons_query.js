import fs from "fs/promises";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const OUTPUT_FILE = "./pokemon.json";

async function fetchPokemon(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar Pokémon ${url}: ${response.status}`);
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

async function fetchPage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar página: ${response.status}`);
  }

  const data = await response.json();

  return {
    count: data.count,
    results: data.results,
    next: data.next,
  };
}

async function main() {
  const { count, results, next } = await fetchPage(`${API_URL}?limit=100`);
  const total = count;
  console.log(`Encontrados ${total} Pokémon.`);

  const pokemons = [];

  for (const pokemon of results) {
    console.log(`Buscando dados de ${pokemon.url}`);
    const pokemonData = await fetchPokemon(pokemon.url);
    pokemons.push(pokemonData);
  }

  let nextPage = next;
  while (nextPage) {
    console.log(`Buscando próxima página: ${nextPage}`);
    const { results: nextResults, next: newNext } = await fetchPage(nextPage);
    for (const pokemon of nextResults) {
      console.log(`Buscando dados de ${pokemon.url}`);
      const pokemonData = await fetchPokemon(pokemon.url);
      pokemons.push(pokemonData);
    }
    nextPage = newNext;
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(pokemons, null, 2), "utf-8");

  console.log(`\nConcluído!`);
  console.log(`Arquivo salvo em: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
