import { PokemonSearchData } from "@/types/pokemon";
import { useEffect, useState } from "react";
import Image from "next/image";
import Select from "../atoms/input-select";

const RARITY_OPTIONS = [
  { label: "Rarity", value: "" },
  { label: "Common", value: "common" },
  { label: "Uncommon", value: "uncommon" },
  { label: "Rare", value: "rare" },
  { label: "Man-made Legendary", value: "man-made legendary" },
  {
    label: "Beings of Nature / Oddities",
    value: "beings of nature / oddities",
  },
  { label: "Time-Displaced Pokémon", value: "time-displaced pokémon" },
  { label: "Ultrabeast", value: "ultrabeast" },
  { label: "Nature", value: "nature" },
  { label: "Gods", value: "gods" },
];

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
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState<"any" | "all">("any");
  const [rarityFilter, setRarityFilter] = useState<string>("");

  const [habitats, setHabitats] = useState<{ name: string }[]>([]);
  const [habitatFilter, setHabitatFilter] = useState<string | null>(null);

  function handleSearchPokemon(name: string) {
    const limit = 100;
    const types = Object.entries(selectedTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type)
      .join(",");

    fetch(
      `/api/pokemon/search?q=${name}&limit=${limit}&types=${types}&typeFilter=${typeFilter}&rarityFilter=${rarityFilter}&habitatFilter=${habitatFilter}`,
    )
      .then((res) => res.json())
      .then((data) => {
        onSearch(data);
      });
  }

  function fetchHabitats() {
    fetch(`/api/habitats`)
      .then((res) => res.json())
      .then((data) => {
        setHabitats(data);
      });
  }

  useEffect(() => {
    handleSearchPokemon(searchQuery);
  }, [searchQuery, typeFilter, selectedTypes, rarityFilter, habitatFilter]);

  useEffect(() => {
    fetchHabitats();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <div className="flex flex-1 bg-card text-primary rounded-lg px-4 py-2 shadow-md">
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
        <div className="flex gap-2 items-center">
          <button
            className={`bg-card rounded-md p-2 cursor-pointer transition-colors shadow-md ${isFiltersVisible ? "bg-primary text-white" : "hover:bg-background-hover"}`}
            onClick={() => {
              setIsFiltersVisible(!isFiltersVisible);
            }}
          >
            Filters
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${isFiltersVisible ? "max-h-96" : "max-h-0"}`}
      >
        <div className="flex gap-2 items-center py-2">
          <Select
            options={RARITY_OPTIONS.map(({ label, value }) => ({
              label,
              value,
            }))}
            value={rarityFilter ?? ""}
            onChange={setRarityFilter}
          />
          <Select
            options={[
              { label: "Habitat", value: "" },
              ...habitats.map(({ name }) => ({
                label: name,
                value: name,
              })),
            ]}
            value={habitatFilter ?? ""}
            onChange={setHabitatFilter}
          />
        </div>
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
