import { useEffect, useState } from "react";
import Image from "next/image";
import SelectField from "../molecules/field-select";
import { usePokemonList } from "@/contexts/PokemonListContext";

const RARITY_OPTIONS = [
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

const TYPE_OPTIONS = [
  { label: "Normal", value: "normal" },
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
  { label: "Electric", value: "electric" },
  { label: "Ice", value: "ice" },
  { label: "Fighting", value: "fighting" },
  { label: "Poison", value: "poison" },
  { label: "Ground", value: "ground" },
  { label: "Flying", value: "flying" },
  { label: "Psychic", value: "psychic" },
  { label: "Bug", value: "bug" },
  { label: "Rock", value: "rock" },
  { label: "Ghost", value: "ghost" },
  { label: "Dark", value: "dark" },
  { label: "Dragon", value: "dragon" },
  { label: "Steel", value: "steel" },
  { label: "Fairy", value: "fairy" },
];

export default function PokemonSearchBar() {
  const { searchQuery, setSearchQuery, filters, setFilters } = usePokemonList();

  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [habitats, setHabitats] = useState<{ name: string }[]>([]);

  function fetchHabitats() {
    fetch(`/api/habitats`)
      .then((res) => res.json())
      .then((data) => {
        setHabitats(data);
      });
  }

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
          <SelectField
            placeholder="Rarity"
            options={RARITY_OPTIONS.map(({ label, value }) => ({
              label,
              value,
            }))}
            value={filters.rarity ?? ""}
            onChange={(value) => setFilters({ ...filters, rarity: value })}
            clearable
          />
          <SelectField
            placeholder="Habitat"
            options={habitats.map(({ name }) => ({
              label: name,
              value: name,
            }))}
            value={filters.habitat ?? ""}
            onChange={(value) => setFilters({ ...filters, habitat: value })}
            clearable
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <button
          className={`bg-card w-12 h-8 rounded-md p-2 cursor-pointer transition-colors shadow-md ${filters.typeFilter === "any" ? "bg-primary text-white" : "hover:bg-background-hover"}`}
          onClick={() => {
            setFilters({ ...filters, typeFilter: "any" });
          }}
        >
          Any
        </button>
        <button
          className={`bg-card w-12 h-8 rounded-md p-2 cursor-pointer transition-colors shadow-md ${filters.typeFilter === "all" ? "bg-primary text-white" : "hover:bg-background-hover"}`}
          onClick={() => {
            setFilters({ ...filters, typeFilter: "all" });
          }}
        >
          All
        </button>
        <div className="flex gap-2 flex-wrap">
          {TYPE_OPTIONS.map(({ value: type }) => {
            const isSelected = filters.types.includes(type);
            return (
              <button
                key={type}
                className={`bg-card rounded-md p-2 cursor-pointer transition-colors shadow-md ${isSelected ? "bg-primary text-white" : "hover:bg-background-hover"}`}
                onClick={() => {
                  setFilters({
                    ...filters,
                    types: filters.types.includes(type)
                      ? filters.types.filter((t) => t !== type)
                      : [...filters.types, type],
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
