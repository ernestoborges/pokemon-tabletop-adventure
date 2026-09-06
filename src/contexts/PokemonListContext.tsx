"use client";

import { PokemonSearchData } from "@/types/pokemon";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface PokemonSearchFilters {
  typeFilter: "any" | "all";
  types: string[];
  rarity: string;
  habitat: string;
  eggGroup: string;
  size: string;
  weight: string;
  proficiency: string;
  diet: string;
  limit: number;
  orderBy: string;
  orderDirection: "asc" | "desc";
}
interface PokemonListContextValue {
  pokemonList: PokemonSearchData[];
  searchQuery: string;
  setSearchQuery: (name: string) => void;
  filters: PokemonSearchFilters;
  setFilters: (filters: PokemonSearchFilters) => void;
}

const PokemonListContext = createContext<PokemonListContextValue | null>(null);

export function PokemonListProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<PokemonSearchData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PokemonSearchFilters>({
    typeFilter: "any",
    types: [],
    rarity: "",
    habitat: "",
    eggGroup: "",
    size: "",
    weight: "",
    proficiency: "",
    diet: "",
    limit: 100,
    orderBy: "id",
    orderDirection: "asc",
  });

  function searchPokemons() {
    const {
      limit,
      typeFilter,
      types,
      rarity,
      habitat,
      eggGroup,
      size,
      weight,
      proficiency,
      diet,
      orderBy,
      orderDirection,
    } = filters;

    const _types = types.join(",");

    fetch(
      `/api/pokemon/search?q=${searchQuery}&limit=${limit}&types=${_types}&typeFilter=${typeFilter}&rarityFilter=${rarity}&habitatFilter=${habitat}&eggGroupFilter=${eggGroup}&sizeFilter=${size}&weightFilter=${weight}&proficiencyFilter=${proficiency}&dietFilter=${diet}&orderBy=${orderBy}&orderDirection=${orderDirection}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data);
      });
  }

  useEffect(() => {
    searchPokemons();
  }, [filters, searchQuery]);

  return (
    <PokemonListContext.Provider
      value={{
        pokemonList,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
      }}
    >
      {children}
    </PokemonListContext.Provider>
  );
}

export function usePokemonList() {
  const context = useContext(PokemonListContext);

  if (!context) {
    throw new Error("usePokemonList must be used inside PokemonListProvider");
  }

  return context;
}
