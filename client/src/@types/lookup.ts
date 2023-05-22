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

export type trainingProvided = {
  id: number;
  user: number;
  requirement: number;
  requirements?: {
    name: string;
    alsoCompletes: number
  };
};

export type CategoryToRequirement = {
  category: number;
  categories: {
    name: string;
  };
  requirement: number;
  requirements: {
    name: string;
  };
};
