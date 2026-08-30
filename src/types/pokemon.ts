import { Move } from "./move";

export type Pokemon = {
  id: number | null;
  name: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
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
};

export type PokemonSearchData = {
  id: number | null;
  name: string;
};
