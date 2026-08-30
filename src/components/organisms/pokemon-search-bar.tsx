import { PokemonSearchData } from "@/types/pokemon";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PokemonSearchBar({
  onSearch,
}: {
  onSearch: (results: PokemonSearchData[]) => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    normal: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    ice: false,
    fighting: false,
    poison: false,
    ground: false,
    flying: false,
    psychic: false,
    bug: false,
    rock: false,
    ghost: false,
    dark: false,
    dragon: false,
    steel: false,
    fairy: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"any" | "all">("any");

  function handleSearchPokemon(name: string) {
    const limit = 10;
    const types = Object.entries(selectedTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type)
      .join(",");

    fetch(
      `/api/pokemon/search?q=${name}&limit=${limit}&types=${types}&typeFilter=${typeFilter}`,
    )
      .then((res) => res.json())
      .then((data) => {
        onSearch(data);
      });
  }

  useEffect(() => {
    handleSearchPokemon(searchQuery);
  }, [searchQuery, typeFilter, selectedTypes]);

  return (
    <div className="w-full">
      <div className="flex bg-card text-primary rounded-lg px-4 py-2 shadow-md">
        <input
          className="w-full h-7 flex-1 border-none p-0 text-lg leading-5 outline-none"
          type="text"
          name="query"
          placeholder="Search for a Pokémon..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
        />
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <button
          className={`bg-card w-12 h-8 rounded-md p-2 cursor-pointer transition-colors shadow-md ${typeFilter === "any" ? "bg-primary text-white" : "hover:bg-background-hover"}`}
          onClick={() => {
            setTypeFilter("any");
          }}
        >
          Any
        </button>
        <button
          className={`bg-card w-12 h-8 rounded-md p-2 cursor-pointer transition-colors shadow-md ${typeFilter === "all" ? "bg-primary text-white" : "hover:bg-background-hover"}`}
          onClick={() => {
            setTypeFilter("all");
          }}
        >
          All
        </button>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(selectedTypes).map(([type, isSelected]) => (
            <button
              key={type}
              className={`bg-card rounded-md p-2 cursor-pointer transition-colors shadow-md ${isSelected ? "bg-primary text-white" : "hover:bg-background-hover"}`}
              onClick={() => {
                setSelectedTypes({
                  ...selectedTypes,
                  [type]: !isSelected,
                });
              }}
            >
              <Image
                src={`/icons/types/${type.toLowerCase()}.png`}
                alt={type}
                width={24}
                height={24}
                title={`${type} type`}
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
