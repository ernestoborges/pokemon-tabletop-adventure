import { PokemonSearchData } from "@/types/pokemon";
import { useEffect } from "react";

export default function PokemonSearchBar({
  searchResults,
  onSearch,
}: {
  searchResults: PokemonSearchData[];
  onSearch: (results: PokemonSearchData[]) => void;
}) {
  function handleSearchPokemon(name: string, limit: number = 10) {
    fetch(`/api/pokemon/search?q=${name}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        onSearch(data);
      });
  }

  useEffect(() => {
    if (searchResults.length < 1) {
      handleSearchPokemon("", 10);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex bg-card text-primary rounded-lg px-4 py-2 shadow-md">
        <input
          className="w-full h-7 flex-1 border-none p-0 text-lg leading-5 outline-none"
          type="text"
          name="query"
          placeholder="Search for a Pokémon..."
          onChange={(e) => {
            handleSearchPokemon(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
}
