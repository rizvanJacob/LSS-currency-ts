export type NewTraining = {
  id: number;
  relatedTraining?: number;
  start: Date;
  end: Date;
  capacity: number;
  instruction: string;
  requirement: number;
  requirementName?: string;
  relatedRequirementName?: string;
  requirements?: {
    name: string;
    alsoCompletes?: number;
  };
  passphrase?: string;
};

export type Training = NewTraining & {
  complete?: boolean;
  trainees: {
    trainee?: number;
    status?: number;
    trainees: {
      id?: number;
      callsign: string;
      categories: {
        name: string;
      };
      currencies: {
        expiry: Date;
      };
      trainings?: {
        status?: number;
      }[];
    };
  }[];
};

export type TrainingFilterOptions = {
  requirement: number;
  showCompleted: boolean;
};
