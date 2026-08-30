import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { Pokemon } from "@/types/pokemon";

export default function Roll20Panel({ pokemon }: { pokemon: Pokemon }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roll20Export, setRoll20Export] = useState<string | null>(null);
  const [isRoll20ExportCopied, setIsRoll20ExportCopied] =
    useState<boolean>(false);

  useEffect(() => {
    async function getPokemonToRoll20() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/pokemon/roll20/${pokemon.name}`);

        if (!res.ok) {
          throw new Error("Failed to fetch Roll20 data");
        }

        const data = await res.json();

        setRoll20Export(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getPokemonToRoll20();
  }, [pokemon.name]);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex w-full justify-end">
        <div className="relative">
          <button
            onClick={() => {
              navigator.clipboard.writeText(roll20Export || "");
              setIsRoll20ExportCopied(true);
            }}
            className={`px-4 py-2 rounded-lg cursor-pointer  ${isRoll20ExportCopied ? "bg-green-300 " : "bg-transparent hover:bg-gray-100"}`}
            onMouseLeave={() => {
              setIsRoll20ExportCopied(false);
            }}
          >
            {isRoll20ExportCopied ? (
              <FaCheck className="text-white" />
            ) : (
              <MdOutlineContentCopy />
            )}
          </button>
          {isRoll20ExportCopied && (
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs text-primary shadow-md animate-in fade-in zoom-in-95">
              Copied!
            </span>
          )}
        </div>
      </div>
      <pre className="flex-1 w-full bg-gray-100 p-4 rounded-lg overflow-x-auto wrap whitespace-pre-wrap text-sm">
        {isLoading ? "Loading..." : roll20Export}
      </pre>
    </div>
  );
}
