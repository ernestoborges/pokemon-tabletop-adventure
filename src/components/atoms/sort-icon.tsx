export default function SortIcon({
  direction,
  arrow,
}: {
  direction?: "asc" | "desc";
  arrow?: boolean;
}) {
  const bar = "h-1 bg-primary rounded-sm transition-all duration-300";

  const firstBar = bar + " " + (direction === "asc" ? "w-2" : "w-6");
  const secondBar = bar + " " + (direction === "asc" ? "w-4" : "w-4");
  const thirdBar = bar + " " + (direction === "asc" ? "w-6" : "w-2");

  return (
    <div
      className={`${arrow ? "w-12" : "w-10"} flex items-center justify-center`}
    >
      <div className="w-full p-2 flex items-center gap-[5px]">
        {arrow && (
          <div className="relative">
            <div className="h-5 w-1 bg-primary rounded-sm" />
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-4 h-full flex items-center justify-center py-1">
              <div className="relative h-full w-1">
                <div
                  className={`h-1 w-2 bg-primary rounded-sm transition-all duration-300 absolute left-0 -translate-x-1 -translate-y-1/2 ${direction === "asc" ? "rotate-45 top-[100%]" : "-rotate-45 top-0"}`}
                />
                <div
                  className={`h-1 w-2 bg-primary rounded-sm transition-all duration-300 absolute right-0 translate-x-1 -translate-y-1/2 ${direction === "asc" ? "-rotate-45 top-[100%]" : "rotate-45 top-0"}`}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className={firstBar} />
          <div className={secondBar} />
          <div className={thirdBar} />
        </div>
      </div>
    </div>
  );
}
