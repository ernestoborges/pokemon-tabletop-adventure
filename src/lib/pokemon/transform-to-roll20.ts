/* eslint-disable @typescript-eslint/no-explicit-any */
import moves from "@/db/moves.json";
import passives from "@/db/passives.json";
import passivesStats from "@/db/passives-stats.json";

export function transformPokemonToRoll20(pokemon: any) {
  const stats = {
    Max_HP: Number(pokemon["HP"]),
    ATK: Number(pokemon["Attack"]),
    DEF: Number(pokemon["Defense"]),
    SPATK: Number(pokemon["Special Attack"]),
    SPDEF: Number(pokemon["Special Defense"]),
    SPD: Number(pokemon["Speed"]),
    dMonst: String(pokemon["dMonst"]) || "",
  };

  const passivesMap: { name: string; description: string }[] = (
    pokemon["Passives"] || ""
  )
    .split(",")
    .map((passiveName: string) => passiveName.trim())
    .filter(Boolean)
    .map((passiveName: string) => {
      const passive = passives.find(
        (passive) =>
          passive["Passive Name"].toLowerCase() === passiveName.toLowerCase(),
      );
      if (!passive) return null;

      return {
        name: passiveName,
        description: `${passiveName}(${passive["Passive Effect"] || ""})`,
      };
    });

  const statPassives = passivesMap
    .filter((passive) => {
      const statPassive = passivesStats.find(
        (statPassive) =>
          statPassive["name"].toLowerCase() === passive.name.toLowerCase(),
      );
      return Boolean(statPassive);
    })
    .map((passive) => {
      return passive.description;
    });

  const nonStatPassives = passivesMap
    .filter((passive) => {
      const statPassive = passivesStats.find(
        (statPassive) =>
          statPassive["name"].toLowerCase() === passive.name.toLowerCase(),
      );
      return !Boolean(statPassive);
    })
    .map((passive) => passive.description);

  const skillNames = (pokemon["Skills"] || "")
    .split(",")
    .map((skillName: string) => skillName.trim())
    .filter(Boolean);

  const moveNames = [
    pokemon["Move 1"],
    pokemon["Move 2"],
    pokemon["Move 3"],
    pokemon["Move 4"],
    pokemon["Move 5"],
    pokemon["Move 6"],
  ].filter(Boolean);

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

      return {
        Name: move.Name,
        Frequency: move.Frequency,
        Range: move.Range,
        Type: move.Type,
        move_class: move["Atk/Special/Effect"],
        num_dice: move["Damage Die Number"],
        die_size:
          move["Damage Die"] === "dM"
            ? `d${pokemon["dMonst"].split("d")[1]}`
            : move["Damage Die"],
        Effect: move.Text,
      };
    })
    .filter(Boolean);

  return {
    Source: "Pokelicious_Cherrygrove",
    Stat_Passives: statPassives,
    Moves: pokemonMoves,
    Skills: skillNames,
    Stats: stats,
    Attributes: {
      Nickname: pokemon["Nickname"] || "",
      Species: pokemon["Pokemon"] || "",
      Type_1: pokemon["Type1"] || "",
      Type_2: pokemon["Type2"] || "",
      Gender: pokemon["Gender"] || "",
      Nature: pokemon["Nature"] || "",
      Size: pokemon["Size"] || "",
      Weight: pokemon["Weight"] || "",
      Egg1: pokemon["EggGroup1"] || "",
      Egg2: pokemon["EggGroup2"] || "",
      Hatch_Time: pokemon["Egg Hatch Rate"] || "",
      Diet: pokemon["Diet"] || "",
      Likes: pokemon["Likes"] || "None",
      Dislikes: pokemon["Dislikes"] || "None",
      Move_Speed: Number(pokemon["Speed"]) * 5 || 0,
      Held_Item: pokemon["Held Item"] || "",
      Loyalty: pokemon["Loyalty"] || "",
    },
    Non_Stat_Passives: nonStatPassives,
  };
}
