import { NextResponse } from "next/server";
import { getPokemonByName } from "@/lib/pokemon/services";
import { pokemonToRoll20Export } from "@/lib/roll20/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  console.log("Fetching Pokémon:", name);

  const pokemon = getPokemonByName(name);
  if (!pokemon) {
    return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
  }

  const roll20Data = pokemonToRoll20Export(pokemon);

  return NextResponse.json(roll20Data);
}
