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

export enum EntryType {
    Hospital = 'Hospital',
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare'
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

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3
}
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatient = Omit<Patient, 'id'>;

// export type NewEntry = Omit<Entry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewEntry = NewHospitalEntry | NewHealthCheckEntry | NewOccupationalHealthcareEntry;
