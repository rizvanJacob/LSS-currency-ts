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
  };
  checkInCode?: string;
};

export type Training = NewTraining & {
  requirements: {
    name: string;
  };
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
    };
  }[];
};

export type TrainingFilterOptions = {
  requirement: number;
  showCompleted: boolean;
};
