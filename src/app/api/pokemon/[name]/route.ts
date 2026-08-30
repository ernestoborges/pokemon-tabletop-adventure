import { NextResponse } from "next/server";
import {
  getPokemonByName,
  getSkillByName,
  getMoveByName,
  getPassiveByName,
} from "@/lib/pokemon/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const pokemon = getPokemonByName(name);
  if (!pokemon) {
    return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
  }
  const pokemonMoves = pokemon.moves.map((move: string) => {
    return getMoveByName(move);
  });

  const pokemonSkills = pokemon.skills.map((skill: string) => {
    return getSkillByName(skill);
  });

  const pokemonPassives = pokemon.passives.map((passive: string) => {
    return getPassiveByName(passive);
  });

  const response = {
    ...pokemon,
    moves: pokemonMoves,
    skills: pokemonSkills,
    passives: pokemonPassives,
  };

  return NextResponse.json(response);
}
