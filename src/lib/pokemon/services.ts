import pokemons from "@/db/pokemons.json";
import moves from "@/db/moves.json";
import passives from "@/db/passives.json";
import skills from "@/db/skills.json";
import {
  Pokemon,
  Passive,
  Move,
  Skill,
  EvolutionNode,
} from "@/lib/pokemon/types";

export function getMoveByName(name: string): Move | undefined {
  return moves.find(
    (move: Move) => move.name.toLowerCase() === name.toLowerCase(),
  );
}

export function getPassiveByName(name: string): Passive | undefined {
  return passives.find(
    (passive: Passive) => passive.name.toLowerCase() === name.toLowerCase(),
  );
}

export function getSkillByName(name: string): Skill | undefined {
  return skills.find(
    (skill: Skill) => skill.name.toLowerCase() === name.toLowerCase(),
  );
}

function _getPokemonByName(name: string) {
  return pokemons.find(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
  );
}

function buildEvolutionTree(
  id: number | null,
  name: string,
  evolutionInto: string | null,
): EvolutionNode {
  const node: EvolutionNode = {
    id: id,
    name: name,
    evolutions: [],
  };
  if (!evolutionInto || evolutionInto.length === 0) return node;

  const evolvesIntoList = evolutionInto
    .split("/")
    .map((name: string) => name.trim());
  node.evolutions = evolvesIntoList
    .map((name: string) => {
      const nextPokemon = _getPokemonByName(name);

      if (!nextPokemon) return null;

      return buildEvolutionTree(
        nextPokemon.id,
        nextPokemon.name,
        nextPokemon.evolution.evolvesInto,
      );
    })
    .filter((p) => !!p);
  return node;
}

export function getPokemonByName(name: string): Pokemon | undefined {
  const pokemon = _getPokemonByName(name);
  if (!pokemon) return undefined;

  const pokemonFamily: { id: number; name: string }[] = pokemon.evolution.family
    .map((familyMember: string) => {
      const p = _getPokemonByName(familyMember);
      if (!p) return null;
      return {
        id: p.id,
        name: p.name,
      };
    })
    .filter(Boolean);

  let familyStarter = pokemonFamily.find(
    (p) =>
      p.name.toLowerCase() === pokemon.evolution.familyStarter.toLowerCase(),
  );
  if (!familyStarter) {
    familyStarter = { id: pokemon.id, name: pokemon.name };
  }

  const evolvesFrom =
    pokemon.evolution.evolvesFrom && pokemonFamily.length > 1
      ? pokemonFamily.find(
          (p) =>
            p.name.toLowerCase() ===
            pokemon.evolution.evolvesFrom.toLowerCase(),
        )
      : null;

  let evolvesInto = [];
  if (pokemon.evolution.evolvesInto && pokemonFamily.length > 1) {
    const evolvesIntoList = pokemon.evolution.evolvesInto
      .split("/")
      .map((name: string) => name.trim());
    evolvesInto = evolvesIntoList
      .map((name: string) => {
        return pokemonFamily.find(
          (p) => p.name.toLowerCase() === name.toLowerCase(),
        );
      })
      .filter(Boolean);
  }

  const familyStarterEvolvesInto = _getPokemonByName(familyStarter.name)
    .evolution.evolvesInto;

  const familyStructure = buildEvolutionTree(
    familyStarter.id,
    familyStarter.name,
    familyStarterEvolvesInto,
  );

  return {
    ...pokemon,
    evolution: {
      ...pokemon.evolution,
      family: pokemonFamily,
      familyStructure: familyStructure,
      familyStarter: familyStarter,
      evolvesFrom: evolvesFrom,
      evolvesInto: evolvesInto,
    },
  };
}

export function getPokemonList(options?: {
  query?: string;
  sort?: "id" | "name";
  limit?: number;
  types?: string[];
  typeFilter?: "any" | "all";
}) {
  let results: Pokemon[] = pokemons;

  if (options?.query)
    results = results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(options.query!.toLowerCase()),
    );

  if (options?.types && options.types.length > 0) {
    const types = options.types.map((type) => type.toLowerCase());

    if (options.typeFilter === "any") {
      results = results.filter((pokemon) =>
        pokemon.types.some((type) => types.includes(type.toLowerCase())),
      );
    }

    if (options.typeFilter === "all") {
      results = results.filter((pokemon) =>
        types.every((selectedType) =>
          pokemon.types.some(
            (pokemonType) => pokemonType.toLowerCase() === selectedType,
          ),
        ),
      );
    }
  }

  if (options?.sort)
    results = results.sort((a, b) => {
      if (options.sort === "id") return a.id - b.id;
      if (options.sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (options?.limit) results = results.slice(0, options.limit);

  return results.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
  }));
}
