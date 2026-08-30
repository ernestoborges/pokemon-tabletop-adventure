import { NextResponse } from "next/server";
import pokemons from "@/db/pokemons.json";
import { transformPokemonToRoll20 } from "@/lib/pokemon/transform-to-roll20";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  console.log("Fetching Pokémon:", name);

  const pokemon = pokemons.find(
    (pokemon) => pokemon["Pokemon"].toLowerCase() === name.toLowerCase(),
  );

  if (!pokemon) {
    return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
  }

  return NextResponse.json(transformPokemonToRoll20(pokemon));
}
