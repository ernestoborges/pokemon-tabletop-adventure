import pokemons from "@/db/pokemons.json";
import moves from "@/db/moves.json";
import passives from "@/db/passives.json";
import skills from "@/db/skills.json";
import { Pokemon, Passive, Move, Skill } from "@/lib/pokemon/types";

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

export function getPokemonByName(name: string): Pokemon | undefined {
  return pokemons.find(
    (pokemon: Pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
  );
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
