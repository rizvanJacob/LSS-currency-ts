export type Training = {
    id: number;
    capacity: number;
    start: Date;
    end: Date;
    complete: boolean;
    instruction: string;
    requirements: {
        name: string;
    };
    trainees: {
        trainees: {
            callsign: string,
            categories: {
                name: string,
            },
            currencies: {
                expiry: Date
            }
        }
    };
    
}