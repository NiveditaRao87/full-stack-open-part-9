import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient, NewEntry } from '../types';
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
};

const addPatient = (patient: NewPatient): Patient => {
  
    const newPatient = {
      id: uuidv4(),
      ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Patient | undefined => {
    const newEntry = {
        id: uuidv4(),
        ...entry
    };

    const updatePatient: Patient | undefined = getPatientById(patientId);
    if(updatePatient){
      updatePatient.entries = [...updatePatient.entries, newEntry];
    }
    return updatePatient;
};

export default {
    getPublicPatients,
    getPatientById,
    addPatient,
    addEntry,
};