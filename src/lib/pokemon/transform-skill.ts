type RawSkill = {
  "Skill Name": string;
  "Skill Effect": string;
};

export function transformSkill(skill: RawSkill) {
  return {
    name: skill["Skill Name"],
    description: skill["Skill Effect"],
  };
}
