import { getPokemonList } from "@/lib/pokemon/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const types =
    searchParams
      .get("types")
      ?.split(",")
      .filter((v): v is string => !!v) ?? [];
  let typeFilter = searchParams.get("typeFilter")?.toLowerCase() as
    | "any"
    | "all"
    | null;
  typeFilter = typeFilter === "all" ? "all" : "any";

  const rarityFilter = searchParams.get("rarityFilter")?.toLowerCase();

  const habitatFilter = searchParams.get("habitatFilter")?.toLowerCase();

  const results = getPokemonList({
    query,
    limit,
    types,
    typeFilter,
    rarityFilter,
    habitatFilter,
  });

  return NextResponse.json(results);
}
