import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import LabeledText from "@/components/atoms/labeled-text";
import PokeballDefaultToken from "@/components/atoms/pokeball-default-token";
import MoveCard from "../molecules/move-card";
import EvolutionLineMenu from "../molecules/evolution-line-menu";

export default function PokemonPanel({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="font-bold text-3xl">{pokemon.name}</div>
          <div className="flex gap-2">
            <div>
              <Image
                src={`/icons/types/${pokemon.types[0].toLocaleLowerCase()}.png`}
                width={32}
                height={32}
                alt={pokemon.types[0]}
                title={pokemon.types[0]}
                unoptimized
              />
            </div>
            <div>
              {pokemon.types[1] && (
                <>
                  <Image
                    src={`/icons/types/${pokemon.types[1].toLocaleLowerCase()}.png`}
                    width={32}
                    height={32}
                    alt={pokemon.types[1]}
                    title={pokemon.types[1]}
                    unoptimized
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <LabeledText label="HP">{pokemon.stats.hp}</LabeledText>
                <LabeledText label="SPD">{pokemon.stats.speed}</LabeledText>
              </div>
              <div>
                <LabeledText label="DEF">{pokemon.stats.def}</LabeledText>
                <LabeledText label="ATK">{pokemon.stats.atk}</LabeledText>
              </div>
              <div>
                <LabeledText label="SDEF">{pokemon.stats.spdef}</LabeledText>
                <LabeledText label="SATK">{pokemon.stats.spatk}</LabeledText>
              </div>
            </div>
            <div className="flex flex-col gap-0">
              <LabeledText label="Monster dice (dM)" uppercase>
                {pokemon.dMonst}
              </LabeledText>
              <LabeledText label="Size" uppercase>
                {pokemon.size}
              </LabeledText>
              <LabeledText label="Weight" uppercase>
                {pokemon.weight}
              </LabeledText>
              <LabeledText label="Rarity" uppercase>
                {pokemon.rarity}
              </LabeledText>
              <LabeledText label="Diet" uppercase>
                {pokemon.diet}
              </LabeledText>
              <LabeledText label="Family" uppercase>
                {pokemon.evolution.family.map((f) => f.name).join(" / ")}
              </LabeledText>
              <LabeledText label="Habitats" uppercase>
                {pokemon.habitats.join(" / ")}
              </LabeledText>
              <LabeledText label="Egg group" uppercase>
                {pokemon.breeding.eggGroups.join(" / ")}
              </LabeledText>
              <LabeledText label="Hatch rate" uppercase>
                {pokemon.breeding.hatchRate}
              </LabeledText>
              <LabeledText label="Signature Move" uppercase>
                {pokemon.signatureMove || "None"}
              </LabeledText>
              <LabeledText label="Proficiencies" uppercase>
                {pokemon.proficiencies.join(", ")}
              </LabeledText>
            </div>
          </div>

          <div className="relative h-64 bg-white w-full sm:w-64">
            {pokemon.id ? (
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                fill
                className="object-contain"
              />
            ) : (
              <PokeballDefaultToken size={256} />
            )}
          </div>
        </div>
        <div>
          <div className="font-bold text-xl">EVOLUTION LINE</div>
          <EvolutionLineMenu pokemon={pokemon} />
        </div>
        <div>
          <div className="font-bold text-xl">PASSIVES</div>
          <div className="bg-background p-2 rounded-md flex flex-col gap-4">
            {pokemon.passives.map((passive) => (
              <LabeledText key={passive.name} label={passive.name}>
                {passive.description}
              </LabeledText>
            ))}
          </div>
        </div>
        <div className="">
          <div className="font-bold text-xl">SKILLS</div>
          <div className="bg-background p-2 rounded-md flex flex-col gap-4">
            {pokemon.skills.map((skill) => (
              <LabeledText key={skill.name} label={skill.name}>
                {skill.description}
              </LabeledText>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-xl">MOVES</div>
          <div className="flex flex-col gap-4">
            {pokemon.moves.map((move) => (
              <MoveCard key={move.name} move={move} dMonst={pokemon.dMonst} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
