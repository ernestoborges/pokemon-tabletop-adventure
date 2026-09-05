"use client";
import { useState, useEffect } from "react";
import { Pokemon, PokemonSearchData } from "@/types/pokemon";
import { usePokemon } from "@/contexts/PokemonContext";
import PokemonList from "@/components/molecules/pokemon-list";
import Tabs from "@/components/molecules/tabs";
import PokemonPanel from "@/components/organisms/pokemon-panel";
import Roll20Panel from "@/components/organisms/roll-20-panel";
import PokemonSearchBar from "../organisms/pokemon-search-bar";

const TABS = [
  { name: "Pokemon", key: "pokemon" },
  { name: "Roll20", key: "roll20" },
];

export default function PokedexMain() {
  const { selectedPokemon } = usePokemon();

  const [searchResults, setSearchResults] = useState<PokemonSearchData[]>([]);
  const [selectedPokemonData, setSelectedPokemonData] =
    useState<Pokemon | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    if (!selectedPokemon) return;

    fetch(`/api/pokemon/${selectedPokemon.name}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedPokemonData(data);
      });
  }, [selectedPokemon]);
  return (
    <main className="flex gap-4 w-full h-dvh flex-col items-center justify-start pt-16 pb-8 px-16 bg-background text-primary">
      <PokemonSearchBar onSearch={(results) => setSearchResults(results)} />
      <div className="flex-1 flex gap-4 w-full min-h-0 rounded-lg">
        <PokemonList pokemons={searchResults} />
        <div className="flex-1 flex flex-col gap-4">
          <Tabs
            selectedTab={selectedTab}
            tabs={TABS}
            onSelectTab={setSelectedTab}
          />
          <div className="flex-1 overflow-y-auto rounded-lg p-6 shadow-md bg-card">
            {selectedTab === 0 && selectedPokemonData && (
              <PokemonPanel pokemon={selectedPokemonData} />
            )}
            {selectedTab === 1 && selectedPokemonData && (
              <Roll20Panel pokemon={selectedPokemonData} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
