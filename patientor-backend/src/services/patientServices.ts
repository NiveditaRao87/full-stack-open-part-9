import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPublicPatients = (): PublicPatient [] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
}

const addPatient = (patient: NewPatient): Patient => {
  
    const newPatient = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: uuidv4() as string,
      ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
    getPublicPatients,
    getPatientById,
    addPatient,
};