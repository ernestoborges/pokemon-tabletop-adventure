import { getPokemonList } from "@/lib/pokemon/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 10);
  let orderBy = searchParams.get("orderBy")?.toLowerCase() as
    | "id"
    | "name"
    | null;
  orderBy = !!orderBy ? orderBy : "id";

  let orderDirection = searchParams.get("orderDirection")?.toLowerCase() as
    | "asc"
    | "desc"
    | null;
  orderDirection = orderDirection === "asc" ? "asc" : "desc";

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

  const eggGroupFilter = searchParams.get("eggGroupFilter")?.toLowerCase();
  const sizeFilter = searchParams.get("sizeFilter")?.toLowerCase();
  const weightFilter = searchParams.get("weightFilter")?.toLowerCase();
  const proficiencyFilter = searchParams
    .get("proficiencyFilter")
    ?.toLowerCase();
  const dietFilter = searchParams.get("dietFilter")?.toLowerCase();

  const results = getPokemonList({
    query,
    perPage,
    page,
    orderBy,
    orderDirection,
    types,
    typeFilter,
    rarityFilter,
    habitatFilter,
    eggGroupFilter,
    sizeFilter,
    weightFilter,
    proficiencyFilter,
    dietFilter,
  });

  return NextResponse.json(results);
}
