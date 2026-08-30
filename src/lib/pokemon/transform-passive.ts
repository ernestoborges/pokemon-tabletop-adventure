type RawPassive = {
  "Passive Name": string;
  "Passive Effect": string;
};

export function transformPassive(passive: RawPassive) {
  return {
    name: passive["Passive Name"],
    description: passive["Passive Effect"],
  };
}
