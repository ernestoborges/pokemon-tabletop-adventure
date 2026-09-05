import { PokemonSearchData } from "@/types/pokemon";
import PokemonTag from "../atoms/pokemon-tag";
import { usePokemon } from "@/contexts/PokemonContext";

export default function PokemonList({
  pokemons,
}: {
  pokemons: PokemonSearchData[];
}) {
  const { selectedPokemon, selectPokemon } = usePokemon();

  function handleSelectPokemon(id: number | null, name: string) {
    selectPokemon(id, name);
  }

  const isSelected = (name: string) => (!!selectedPokemon && selectedPokemon.name === name); 

  return (
    <div className="bg-card p-4 rounded-lg shadow-md min-w-64 sm:min-w-80 overflow-y-auto">
      <div className="flex flex-col gap-2 overflow-y-auto">
        {pokemons.map((pokemon) => (
          <PokemonTag
            key={pokemon.name}
            id={pokemon.id}
            name={pokemon.name}
            onClick={() => handleSelectPokemon(pokemon.id, pokemon.name)}
            selected={isSelected(pokemon.name)}
          />
        ))}
      </div>
    </div>
  );
}
