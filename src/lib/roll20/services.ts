import { Pokemon } from "../pokemon/types";
import {
  getMoveByName,
  getSkillByName,
  getPassiveByName,
} from "../pokemon/services";

export function pokemonToRoll20Export(pokemon: Pokemon) {
  const stats = {
    Max_HP: pokemon.stats.hp,
    ATK: pokemon.stats.atk,
    DEF: pokemon.stats.def,
    SPATK: pokemon.stats.spatk,
    SPDEF: pokemon.stats.spdef,
    SPD: pokemon.stats.speed,
    dMonst: pokemon.dMonst || "",
  };

  const pokemonMoves = pokemon.moves
    .map((move: string) => {
      return getMoveByName(move);
    })
    .filter((move) => !!move)
    .map((move) => {
      return {
        Name: move.name,
        Frequency: move.frequency,
        Range: move.range,
        Type: move.type,
        move_class: move.category,
        num_dice: move.damage.dieNumber,
        die_size:
          move.damage.die === "dM"
            ? `d${pokemon.dMonst.split("d")[1]}`
            : move.damage.die,
        Effect: move.text,
      };
    });

  const pokemonSkills = pokemon.skills.map((skill: string) => {
    return getSkillByName(skill);
  });

  const pokemonPassives = pokemon.passives.map((passive: string) => {
    return getPassiveByName(passive);
  });

  return {
    Source: "Pokelicious_Cherrygrove",
    Stat_Passives: [],
    Moves: pokemonMoves,
    Skills: pokemonSkills,
    Stats: stats,
    Attributes: {
      Nickname: "",
      Species: pokemon.name || "",
      Type_1: pokemon.types[0] || "",
      Type_2: pokemon.types[1] || "",
      Gender: "",
      Nature: "",
      Size: pokemon.size || "",
      Weight: pokemon.weight || "",
      Egg1: pokemon.breeding.eggGroups[0] || "",
      Egg2: pokemon.breeding.eggGroups[1] || "",
      Hatch_Time: pokemon.breeding.hatchRate || "",
      Diet: pokemon.diet || "",
      Likes: "None",
      Dislikes: "None",
      Move_Speed: Number(pokemon.stats.speed) * 5 || 0,
      Held_Item: "",
      Loyalty: "",
    },
    Non_Stat_Passives: pokemonPassives,
  };
}
