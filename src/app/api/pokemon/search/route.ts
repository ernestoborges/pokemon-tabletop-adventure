import { getPokemonList } from "@/lib/pokemon/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);

  const results = getPokemonList({ query, limit });

  return NextResponse.json(results);
}
