/* eslint-disable @typescript-eslint/no-explicit-any */
import moves from "@/db/moves.json";
import passives from "@/db/passives.json";
import skills from "@/db/skills.json";
import officialPokemons from "@/db/official_pokemon_data/pokemons.json";
import { transformMove } from "./transform-move";
import { transformPassive } from "./transform-passive";
import { transformSkill } from "./transform-skill";

type officialPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: {
    name: string;
    isHidden: boolean;
  }[];
  stats: {
    name: string;
    value: number;
  }[];
  sprites: {
    front: string;
    officialArtwork: string;
  };
};

export function transformPokemon(pokemon: any) {
  const pokemonId = officialPokemons.find(
    (p: officialPokemon) =>
      p.name.toLowerCase() === pokemon["Pokemon"].toLowerCase(),
  );
  const stats = {
    hp: Number(pokemon["HP"]),
    attack: Number(pokemon["Attack"]),
    defense: Number(pokemon["Defense"]),
    specialAttack: Number(pokemon["Special Attack"]),
    specialDefense: Number(pokemon["Special Defense"]),
    speed: Number(pokemon["Speed"]),
  };

  const moveNames = [
    pokemon["Move 1"],
    pokemon["Move 2"],
    pokemon["Move 3"],
    pokemon["Move 4"],
    pokemon["Move 5"],
    pokemon["Move 6"],
  ].filter(Boolean);

  const passiveNames = (pokemon["Passives"] || "")
    .split(",")
    .map((passiveName: string) => passiveName.trim())
    .filter(Boolean);

  const skillNames = (pokemon["Skills"] || "")
    .split(",")
    .map((skillName: string) => skillName.trim())
    .filter(Boolean);

  const pokemonMoves = moveNames
    .map((moveName) => {
      const move = moves.find(
        (move) => move.Name.toLowerCase() === moveName.toLowerCase(),
      );

      if (!move) {
        console.warn(
          `Move "${moveName}" not found for Pokémon "${pokemon["Pokemon"]}"`,
        );

        return null;
      }

      return transformMove(move, pokemon["dMonst"]);
    })
    .filter(Boolean);

  const pokemonPassives = passiveNames
    .map((passiveName: string) => {
      const passive = passives.find(
        (passive) =>
          passive["Passive Name"].toLowerCase() === passiveName.toLowerCase(),
      );
      if (!passive) {
        console.warn(
          `Passive "${passiveName}" not found for Pokémon "${pokemon["Pokemon"]}"`,
        );

        return null;
      }

      return transformPassive(passive);
    })
    .filter(Boolean);

  const pokemonSkills = skillNames
    .map((skillName: string) => {
      const skill = skills.find(
        (skill) =>
          skill["Skill Name"].toLowerCase() === skillName.toLowerCase(),
      );

      if (!skill) {
        console.warn(
          `Skill "${skillName}" not found for Pokémon "${pokemon["Pokemon"]}"`,
        );
        return null;
      }

      return transformSkill(skill);
    })
    .filter(Boolean);

  return {
    id: pokemonId?.id || null,
    name: pokemon["Pokemon"],
    stats,
    modifiers: {
      attack: Math.floor(stats.attack / 2),
      defense: Math.floor(stats.defense / 2),
      specialAttack: Math.floor(stats.specialAttack / 2),
      specialDefense: Math.floor(stats.specialDefense / 2),
      speed: Math.floor(stats.speed / 2),
    },
    types: [pokemon["Type1"], pokemon["Type2"]].filter(Boolean),
    moves: pokemonMoves,
    size: pokemon["Size"],
    weight: pokemon["Weight"],
    skills: pokemonSkills,
    passives: pokemonPassives,
    proficiencies: pokemon["Proficiencies"]
      ? pokemon["Proficiencies"].split(",").map((value: string) => value.trim())
      : [],
    signatureMove: pokemon["Combined Sig"] || null,
    breeding: {
      eggGroups: [pokemon["EggGroup1"], pokemon["EggGroup2"]].filter(Boolean),
      hatchRate: pokemon["Egg Hatch Rate"] || null,
    },
    habitats: pokemon["Habitats"]
      ? pokemon["Habitats"].split(",").map((value: string) => value.trim())
      : [],
    diet: pokemon["Diet"] || null,
    rarity: pokemon["Rarity"] || null,
    evolution: {
      stage: Number(pokemon["Evolutionary Stage"]) || null,
      evolvesFrom: pokemon["Evolves From"] || null,
      evolvesInto: pokemon["Evolves Into:"] || null,
      familyStarter: pokemon["Family starter"] || null,
      family: pokemon["Family"]
        ? pokemon["Family"].split("/").map((value: string) => value.trim())
        : [],
    },
  };
}
