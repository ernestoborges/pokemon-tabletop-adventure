import Image from "next/image";
import PokeballDefaultToken from "./pokeball-default-token";

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
      title={name}
    >
      <div className="flex items-center gap-1 min-w-0" onClick={onClick}>
        <div className="flex-none w-16 h-16 min-w-16 min-h-16 max-w-16 max-h-16">
          {id ? (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name}
              width={64}
              height={64}
              className="block w-16 h-16 max-w-none rounded-lg scale-x-[-1]"
            />
          ) : (
            <PokeballDefaultToken />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <span className="text-muted">
              #{id ? id.toString().padStart(3, "0") : "???"}
            </span>

            <span className="truncate">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
