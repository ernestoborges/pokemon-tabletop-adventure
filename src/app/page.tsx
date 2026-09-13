import PokedexMain from "@/components/templates/pokedex-main";
import { PokemonProvider } from "@/contexts/PokemonContext";
import { PokemonListProvider } from "@/contexts/PokemonListContext";

export default function Home() {
  return (
    <PokemonListProvider>
      <PokemonProvider>
        <PokedexMain />
      </PokemonProvider>
    </PokemonListProvider>
  );
}
