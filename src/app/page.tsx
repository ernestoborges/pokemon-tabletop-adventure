import PokedexMain from "@/components/templates/pokedex-main";
import { PokemonProvider } from "@/contexts/PokemonContext";

export default function Home() {
  return (
    <PokemonProvider>
      <PokedexMain />;
    </PokemonProvider>
  );
}
