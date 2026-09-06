"use client";

import { Pokemon } from "@/types/pokemon";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface PokemonContextValue {
  selectedPokemon: {
    id: number | null;
    name: string;
  } | null;
  selectedPokemonData: Pokemon | null;
  selectPokemon: (id: number | null, name: string) => void;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<{
    id: number | null;
    name: string;
  } | null>(null);

  const [selectedPokemonData, setSelectedPokemonData] =
    useState<Pokemon | null>(null);

  function selectPokemon(id: number | null, name: string) {
    setSelectedPokemon({ id, name });
  }

  useEffect(() => {
    if (!selectedPokemon) return;

    fetch(`/api/pokemon/${selectedPokemon.name}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedPokemonData(data);
      });
  }, [selectedPokemon]);

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        selectedPokemonData,
        selectPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used inside PokemonProvider");
  }

  return context;
}
