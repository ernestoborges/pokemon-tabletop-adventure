import fs from "fs/promises";

const INPUT = "src/db/pta-pokemon-data/pokemons.json";
const OUTPUT = "src/db/scripts/output/pokemon.json";

const OFFICIAL_POKEMON_DATA = "src/db/official-pokemon-data/pokemons.json";
const officialPokemonData = JSON.parse(
  await fs.readFile(OFFICIAL_POKEMON_DATA, "utf8"),
);

function splitList(value) {
  if (!value || typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumber(value) {
  if (value === "" || value == null) {
    return null;
  }

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
}

function normalizePokemon(pokemon) {
  const id =
    officialPokemonData.find(
      (officialPokemon) =>
        officialPokemon.name.toLowerCase() === pokemon["Pokemon"].toLowerCase(),
    )?.id || null;

  const types = [
    pokemon["Type1"] || "Typeless",
    pokemon["Type2"] || null,
  ].filter(Boolean);

  //MOVES
  const moveNames = [
    pokemon["Move 1"],
    pokemon["Move 2"],
    pokemon["Move 3"],
    pokemon["Move 4"],
    pokemon["Move 5"],
    pokemon["Move 6"],
  ].filter(Boolean);

  return {
    id: id,
    name: pokemon["Pokemon"],
    dMonst: pokemon["dMonst"] || null,
    stats: {
      hp: parseNumber(pokemon["HP"]),
      atk: parseNumber(pokemon["Attack"]),
      def: parseNumber(pokemon["Defense"]),
      spatk: parseNumber(pokemon["Special Attack"]),
      spdef: parseNumber(pokemon["Special Defense"]),
      speed: parseNumber(pokemon["Speed"]),
    },
    types: types,
    moves: moveNames,
    size: pokemon["Size"] || null,
    weight: pokemon["Weight"] || null,

    skills: splitList(pokemon["Skills"]),
    passives: splitList(pokemon["Passives"]),
    proficiencies: splitList(pokemon["Proficiencies"]),
    signatureMoves: splitList(pokemon["Combined Sig"]),

    breeding: {
      eggGroups: [pokemon["EggGroup1"], pokemon["EggGroup2"]].filter(Boolean),
      hatchRate: pokemon["Egg Hatch Rate"] || null,
    },

    habitats: splitList(pokemon["Habitats"]),
    diet: pokemon["Diet"] || null,
    rarity: pokemon["Rarity"] || null,
    rememberedMoves: [
      pokemon["Remembered move 1"],
      pokemon["Remembered move 2"],
      pokemon["Remembered move 3"],
    ].filter(Boolean),

    rememberedStyle: pokemon["Remembered Style"] || null,

    evolution: {
      stage: parseNumber(pokemon["Evolutionary Stage"]),
      family: splitList(pokemon["Family"].replaceAll(" / ", ",")),
      familyStarter: pokemon["Family starter"] || null,
      prevEvolutionIndex: parseNumber(pokemon["Prev evo index:"]),
      evolutionaryStage: parseNumber(pokemon["Evolutionary Stage"]),
      evolvesFrom: pokemon["Evolves From"] || null,
      evolvesInto: pokemon["Evolves Into:"] || null,
    },

    page: pokemon["Page #"],
    stage: parseNumber(pokemon["Stage"]),
    captureStage: parseNumber(pokemon["Stage (Capture)"]),
    special: {
      gigantamax: pokemon["G-max or mega?"] || null,
      gigantamaxMove: pokemon["Gigantamax Move"] || null,
    },
    legendary: {
      HP: parseNumber(pokemon["Legendary HP"]),
      moves: [
        pokemon["Legendary Move 1"],
        pokemon["Legendary Move 2"],
        pokemon["Legendary Move 3"],
        pokemon["Legendary Move 4"],
      ].filter(Boolean),
      passives: [
        pokemon["Legendary Passive 1"],
        pokemon["Legendary Passive 2"],
        pokemon["Legendary Passive 3"],
      ].filter(Boolean),
      features: [
        pokemon["Legendary Feature 1"],
        pokemon["Legendary Feature 2"],
      ].filter(Boolean),
    },
  };
}

async function main() {
  const rawData = JSON.parse(await fs.readFile(INPUT, "utf8"));

  const normalizedData = rawData.map(normalizePokemon);

  await fs.writeFile(OUTPUT, JSON.stringify(normalizedData, null, 2), "utf8");

  console.log(`✓ ${normalizedData.length} Pokémon normalizados`);

  console.log(`✓ Arquivo: ${OUTPUT}`);
}

main().catch(console.error);
