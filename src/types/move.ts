export type Move = {
  name: string;
  frequency: string;
  range: string;
  type: string;
  category: string;
  damage: {
    dieNumber: number;
    die: string;
  };
  text: string;
  grantedSkills: string[];
  contest: {
    stat: string | null;
    keyword: string | null;
  };
  frequencyCategory: string;
  rangeCategory: string;
};
