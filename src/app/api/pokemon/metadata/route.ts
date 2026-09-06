import { NextRequest, NextResponse } from "next/server";
import { getPokemonMetadata } from "@/lib/pokemon/services";

export async function GET(request: NextRequest) {
  const field = request.nextUrl.searchParams.get("field");
  if (!field) {
    return NextResponse.json(
      { error: "Field parameter is required" },
      { status: 400 },
    );
  }

  return NextResponse.json(getPokemonMetadata(field));
}
