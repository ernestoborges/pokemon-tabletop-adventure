export function compareValues(
  a: string | number,
  b: string | number,
  direction: "asc" | "desc" = "asc",
) {
  const aIsNumber = typeof a === "number";
  const bIsNumber = typeof b === "number";

  let result: number;

  if (aIsNumber && bIsNumber) {
    result = a - b;
  } else {
    result = String(a).localeCompare(String(b), undefined, {
      sensitivity: "base",
      numeric: true,
    });
  }

  return direction === "desc" ? -result : result;
}
