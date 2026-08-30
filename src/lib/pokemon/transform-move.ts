type RawMove = {
  Name: string;
  Frequency: string;
  Range: string;
  Type: string;
  "Atk/Special/Effect": string;
  "Damage Die Number": string;
  "Damage Die": string;
  Text: string;
  "Granted Skills": string;
  "Contest Stat": string;
  "Contest Keyword": string;
  FreqCategory: string;
  RangeCategory: string;
};

export function transformMove(move: RawMove, dMonster: string = "dM") {
  return {
    name: move.Name,

    frequency: move.Frequency,
    range: move.Range,

    type: move.Type,
    category: move["Atk/Special/Effect"],

    damage: {
      dieNumber: move["Damage Die Number"]
        ? Number(move["Damage Die Number"])
        : null,

      die:
        move["Damage Die"] === "dM"
          ? `d${dMonster.split("d")[1]}`
          : move["Damage Die"] || null,
    },

    text: move.Text,

    grantedSkills: move["Granted Skills"]
      ? move["Granted Skills"].split(",").map((skill) => skill.trim())
      : [],

    contest: {
      stat: move["Contest Stat"] || null,
      keyword: move["Contest Keyword"] || null,
    },

    frequencyCategory: move.FreqCategory,
    rangeCategory: move.RangeCategory,
  };
}
