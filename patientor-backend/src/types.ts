export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    NonBinary = 'non-binary',
    TransgenderMale = 'transgender-male',
    TransgenderFemale = 'transgender-female',
    Intersex = 'intersex',
    Other = 'other',
    DeclineToDisclose = 'decline-to-disclose'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >

export type NewPatient = Omit<Patient, 'id'>;