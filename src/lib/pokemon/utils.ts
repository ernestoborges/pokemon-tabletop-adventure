import { OrderBy, Pokemon } from "./types";

export const orderByGetters: Record<
  OrderBy,
  (pokemon: Pokemon) => string | number
> = {
  id: (pokemon) => pokemon.id,
  name: (pokemon) => pokemon.name,
  hp: (pokemon) => pokemon.stats.hp,
  atk: (pokemon) => pokemon.stats.atk,
  def: (pokemon) => pokemon.stats.def,
  spatk: (pokemon) => pokemon.stats.spatk,
  spdef: (pokemon) => pokemon.stats.spdef,
  speed: (pokemon) => pokemon.stats.speed,
};
