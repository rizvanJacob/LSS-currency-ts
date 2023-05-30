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
    alsoCompletes: number;
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

export type Booking = {
  id: number;
  trainees: {
    id: number;
    callsign: string;
    category: number;
    categories: {
      name: string;
    };
  };
  trainings: {
    requirement: number;
    requirements: {
      name: string;
    };
    capacity: number;
    start: Date;
    end: Date;
    complete: boolean;
  };
  status: number;
  statuses: {
    name: string;
  };
};
