import { Pokemon, PokemonSearchData } from "@/types/pokemon";
import PokemonTag from "../atoms/pokemon-tag";

export default function PokemonList({
  pokemons,
  selectedPokemon,
  onSelectPokemon,
  onSelectPokemonData,
}: {
  pokemons: PokemonSearchData[];
  selectedPokemon: PokemonSearchData | null;
  onSelectPokemon: (pokemon: PokemonSearchData) => void;
  onSelectPokemonData: (pokemon: Pokemon) => void;
}) {
  function handleSelectPokemon(name: string) {
    fetch(`/api/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        onSelectPokemon({ name: data.name, id: data.id });
        onSelectPokemonData(data);
      });
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow-md min-w-64 sm:min-w-80 overflow-y-auto">
      <div className="flex flex-col gap-2 overflow-y-auto">
        {pokemons.map((pokemon) => (
          <PokemonTag
            key={pokemon.name}
            id={pokemon.id}
            name={pokemon.name}
            onClick={() => handleSelectPokemon(pokemon.name)}
            selected={selectedPokemon?.name === pokemon.name}
          />
        ))}
      </div>
    </div>
  );
}
