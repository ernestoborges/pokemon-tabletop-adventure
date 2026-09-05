"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PokemonContextValue {
  selectedPokemon: {
    id: number | null;
    name: string;
  } | null;
  selectPokemon: (id: number | null, name: string) => void;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<{
    id: number | null;
    name: string;
  } | null>(null);

  function selectPokemon(id: number | null, name: string) {
    setSelectedPokemon({ id, name });
  }

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
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
