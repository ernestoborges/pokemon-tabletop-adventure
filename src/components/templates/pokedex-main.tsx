"use client";
import { useState } from "react";
import PokemonList from "@/components/molecules/pokemon-list";
import Tabs from "@/components/molecules/tabs";
import PokemonPanel from "@/components/organisms/pokemon-panel";
import Roll20Panel from "@/components/organisms/roll-20-panel";
import PokemonSearchBar from "../organisms/pokemon-search-bar";
import DarkModeButton from "../atoms/dark-mode-button";

const TABS = [
  { name: "Pokemon", key: "pokemon" },
  { name: "Roll20", key: "roll20" },
];

export default function PokedexMain() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <main className="flex gap-4 w-full h-dvh flex-col items-center justify-start pt-4 pb-8 px-4 bg-background text-primary">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">
          Pokemon Tabletop Adventure 3.5 Pokedex
        </h1>
        <DarkModeButton />
      </div>
      <PokemonSearchBar />
      <div className="flex-1 flex gap-4 w-full min-h-0 rounded-lg">
        <PokemonList />
        <div className="flex-1 flex flex-col gap-4">
          <Tabs
            selectedTab={selectedTab}
            tabs={TABS}
            onSelectTab={setSelectedTab}
          />
          <div className="flex-1 overflow-y-auto rounded-lg p-6 shadow-md bg-card">
            {selectedTab === 0 && <PokemonPanel />}
            {selectedTab === 1 && <Roll20Panel />}
          </div>
        </div>
      </div>
    </main>
  );
}
