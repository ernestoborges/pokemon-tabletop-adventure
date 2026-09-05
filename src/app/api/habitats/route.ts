import { NextResponse } from "next/server";
import { getHabitats } from "@/lib/pokemon/services";

export async function GET() {
  const habitats = getHabitats();
  return NextResponse.json(habitats);
}
