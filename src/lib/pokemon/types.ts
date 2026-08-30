export interface Pokemon {
  id: number;
  name: string;
  dMonst: string;

  stats: PokemonStats;

  types: string[];
  moves: string[];

  size: string;
  weight: string;

  skills: string[];
  passives: string[];
  proficiencies: string[];
  signatureMoves: string[];

  breeding: PokemonBreeding;

  habitats: string[];
  diet: string;
  rarity: string;

  rememberedMoves: string[];
  rememberedStyle: string | null;

  evolution: PokemonEvolution;

  page: string;
  stage: number;
  captureStage: number;

  special: PokemonSpecial;
  legendary: PokemonLegendary;
}

export interface PokemonStats {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  speed: number;
}

export interface PokemonBreeding {
  eggGroups: string[];
  hatchRate: string;
}

export interface PokemonEvolution {
  stage: number;
  family: string[];
  familyStarter: string;
  prevEvolutionIndex: number;
  evolutionaryStage: number;
  evolvesFrom: string | null;
  evolvesInto: string | null;
}

export interface PokemonSpecial {
  gigantamax: string | null;
  gigantamaxMove: string | null;
}

export interface PokemonLegendary {
  HP: number | null;
  moves: string[];
  passives: string[];
  features: string[];
}

export interface Skill {
  name: string;
  description: string;
  summary: string;
}

export interface Passive {
  name: string;
  description: string;
}

export interface Move {
  name: string;
  frequency: string;
  range: string;
  type: string;
  category: string;
  damage: {
    dieNumber: number | null;
    die: string | null;
  };
  text: string;
  grantedSkills: string[];
  contest: {
    stat: string | null;
    keyword: string | null;
  };
  frequencyCategory: string;
  rangeCategory: string | null;
}
