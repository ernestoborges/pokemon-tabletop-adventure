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
  perPage: number;
  page: number;
  orderBy: string;
  orderDirection: "asc" | "desc";
}
interface PokemonListContextValue {
  pokemonList: PokemonSearchData[];
  searchQuery: string;
  setSearchQuery: (name: string) => void;
  filters: PokemonSearchFilters;
  setFilters: (filters: PokemonSearchFilters) => void;
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

const PokemonListContext = createContext<PokemonListContextValue | null>(null);

export function PokemonListProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<PokemonSearchData[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0,
  });
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
    perPage: 10,
    page: 1,
    orderBy: "id",
    orderDirection: "asc",
  });

  function searchPokemons() {
    const {
      perPage,
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
      `/api/pokemon/search?q=${searchQuery}&page=${filters.page}&perPage=${perPage}&types=${_types}&typeFilter=${typeFilter}&rarityFilter=${rarity}&habitatFilter=${habitat}&eggGroupFilter=${eggGroup}&sizeFilter=${size}&weightFilter=${weight}&proficiencyFilter=${proficiency}&dietFilter=${diet}&orderBy=${orderBy}&orderDirection=${orderDirection}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const { pagination, data: responseList } = data;
        setPokemonList(responseList);
        setPagination(pagination);
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
        pagination,
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
