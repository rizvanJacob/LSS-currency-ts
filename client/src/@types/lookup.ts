export type SimpleLookup = {
  id: number;
  name: string;
};

export type Requirement = {
  id: number;
  name: string;
  hasSeniority: boolean;
  rehackPeriod: number;
  extensionPeriod: number;
  seniorExtension: number;
};
