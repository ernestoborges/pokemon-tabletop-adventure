import { Move } from "@/types/move";
import Image from "next/image";

export default function MoveCard({ move }: { move: Move }) {
  return (
    <div
      key={move.name}
      className="flex flex-col gap-2 p-2 bg-background rounded-lg"
    >
      <div className="flex gap-2">
        <div className="flex gap-2 grow text-primary font-bold">
          {move.name}
        </div>
        <div>
          <Image
            src={`/icons/types/${move.type}.png`}
            width={32}
            height={32}
            alt={move.type}
            title={move.type}
          />
        </div>
        {/* <div>{move.rangeCategory}</div> */}
      </div>
      <div className="flex gap-2 text-muted">
        <div>{move.range || "Self"}</div>
        <div>{move.category}</div>
        <div>
          {move.damage.dieNumber}
          {move.damage.die}
        </div>
        <div>{move.frequency}</div>
      </div>
      <div>{move.text}</div>
    </div>
  );
}
