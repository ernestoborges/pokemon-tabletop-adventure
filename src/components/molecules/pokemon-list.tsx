import PokemonTag from "../atoms/pokemon-tag";
import { usePokemon } from "@/contexts/PokemonContext";
import SelectField from "./field-select";
import SortIcon from "../atoms/sort-icon";
import { usePokemonList } from "@/contexts/PokemonListContext";
import Pagination from "@/components/molecules/pagination";

const ORDER_BY_OPTIONS = [
  { label: "ID", value: "id" },
  { label: "Name", value: "name" },
  { label: "HP", value: "hp" },
  { label: "Attack", value: "atk" },
  { label: "Defense", value: "def" },
  { label: "Special Attack", value: "spatk" },
  { label: "Special Defense", value: "spdef" },
  { label: "Speed", value: "speed" },
];

export default function PokemonList() {
  const { selectedPokemon, selectPokemon } = usePokemon();
  const { pokemonList, filters, setFilters, pagination } = usePokemonList();

  function handleSelectPokemon(id: number | null, name: string) {
    selectPokemon(id, name);
  }

  const isSelected = (name: string) =>
    !!selectedPokemon && selectedPokemon.name === name;

  return (
    <div className="flex flex-col gap-2 bg-card p-4 rounded-lg shadow-md w-64 sm:w-80 overflow-y-auto">
      <div className="flex gap-2">
        <SelectField
          options={ORDER_BY_OPTIONS}
          value={filters.orderBy}
          onChange={(value) =>
            setFilters({ ...filters, orderBy: value as "id" | "name" })
          }
        />
        <div
          className="cursor-pointer bg-card rounded-md shadow-md hover:bg-background-hover"
          onClick={() =>
            setFilters({
              ...filters,
              orderDirection: filters.orderDirection === "asc" ? "desc" : "asc",
            })
          }
        >
          <SortIcon direction={filters.orderDirection} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {pokemonList.map((pokemon) => (
          <PokemonTag
            key={pokemon.name}
            id={pokemon.id}
            name={pokemon.name}
            onClick={() => handleSelectPokemon(pokemon.id, pokemon.name)}
            selected={isSelected(pokemon.name)}
          />
        ))}
      </div>
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        itemsPerPage={pagination.perPage}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onItemsPerPageChange={(itemsPerPage) =>
          setFilters({ ...filters, perPage: itemsPerPage })
        }
      />
    </div>
  );
}
