import { NextResponse } from "next/server";
import pokemons from "@/db/pokemons.json";
import { transformPokemon } from "@/lib/pokemon/transform-pokemon";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);

  const results = pokemons
    .filter((pokemon) => pokemon["Pokemon"].toLowerCase().includes(query))
    .slice(0, limit)
    .map(transformPokemon);

  return NextResponse.json(results);
}
