import { Pokemon, PokemonFamilyNode } from "@/types/pokemon";
import { usePokemon } from "@/contexts/PokemonContext";
import PokeballDefaultToken from "@/components/atoms/pokeball-default-token";
import Image from "next/image";

export default function EvolutionLineMenu({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <FamilyLevelGroup
        node={pokemon.evolution.familyStructure}
        id={pokemon.evolution.familyStarter?.id ?? null}
        name={pokemon.evolution.familyStarter?.name ?? pokemon.name}
        selectedPokemon={pokemon.name}
      />
    </div>
  );
}

function FamilyLevelGroup({
  id,
  name,
  node,
  selectedPokemon,
}: {
  id: number | null;
  name: string;
  node: PokemonFamilyNode;
  selectedPokemon: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Button id={id} name={name} selectedPokemon={selectedPokemon} />
      {node.evolutions && (
        <div
          className={`flex ${node.name.toLowerCase() === "eevee" ? "flex-row" : "flex-col gap-2"}`}
        >
          {node.evolutions.map(
            (evolution) =>
              evolution.id && (
                <FamilyLevelGroup
                  key={evolution.id}
                  node={evolution}
                  id={evolution.id}
                  name={evolution.name}
                  selectedPokemon={selectedPokemon}
                />
              ),
          )}
        </div>
      )}
    </div>
  );
}

function Button({
  id,
  name,
  selectedPokemon,
}: {
  id: number | null;
  name: string;
  selectedPokemon: string;
}) {
  const { selectPokemon } = usePokemon();
  const selected = selectedPokemon.toLocaleLowerCase() === name.toLowerCase();
  return (
    <button onClick={() => selectPokemon(id, name)}>
      <div>
        <div
          className={`rounded-md cursor-pointer transition-colors ${selected ? "bg-blue-400" : "bg-background hover:bg-background-hover"}`}
        >
          {id ? (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
              width={64}
              height={64}
            />
          ) : (
            <PokeballDefaultToken size={64} />
          )}
        </div>
        <div className="text-sm font-semibold">{name}</div>
      </div>
    </button>
  );
}
