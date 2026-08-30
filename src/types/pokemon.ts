import { Move } from "./move";

export type Pokemon = {
  id: number | null;
  name: string;
  dMonst: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
  };
  types: string[];
  moves: Move[];
  size: string | null;
  weight: string | null;
  skills: {
    name: string;
    description: string;
  }[];
  passives: {
    name: string;
    description: string;
  }[];
  proficiencies: string[];
  signatureMove: string | null;
  breeding: {
    eggGroups: string[];
    hatchRate: string | null;
  };
  habitats: string[];
  diet: string | null;
  rarity: string | null;
  evolution: {
    stage: number | null;
    evolvesFrom: string | null;
    evolvesInto: string | null;
    familyStarter: string | null;
    family: string[];
  };
  page: string;
  captureStage: number;
  special: {
    gigantamax: string | null;
    gigantamaxMove: string | null;
  };
};

export type PokemonSearchData = {
  id: number | null;
  name: string;
};
