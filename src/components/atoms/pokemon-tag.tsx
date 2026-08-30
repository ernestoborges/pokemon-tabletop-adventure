import Image from "next/image";
import PokeballDefaultToken from "../pokeball-default-token";

export default function PokemonTag({
  id,
  name,
  selected = false,
  onClick = () => {},
}: {
  id?: number | null;
  name: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded-lg shadow-xs border bg-background hover:bg-background-hover cursor-pointer ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      <div className="flex gap-1 items-center" onClick={onClick}>
        <div>
          {id ? (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
              width={64}
              height={64}
              className="rounded-lg scale-x-[-1]"
            />
          ) : (
            <PokeballDefaultToken />
          )}
        </div>
        <span className="text-muted mr-2">
          #{id ? id.toString().padStart(3, "0") : "???"}
        </span>

        {name}
      </div>
    </div>
  );
}
