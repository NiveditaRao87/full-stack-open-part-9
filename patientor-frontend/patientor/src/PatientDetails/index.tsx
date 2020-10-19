import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { Patient, Gender } from '../types';
import { apiBaseUrl } from "../constants";
import { AddPatient, useStateValue } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { HospitalEntryFormValues } from '../AddEntryModal/HospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntryModal/HealthCheckEntryForm';
import { OccupationalHealthcareEntryFormValues } from '../AddEntryModal/OccupationalHealthcareEntryForm';

const PatientDetails: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patientDetails, setPatientDetails] = React.useState<Patient | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    setPatientDetails(Object.values(patients).find((p: Patient) => p.id === id));
    if(patientDetails && !patientDetails.ssn){
      const fetchPatientDetails = async () => {
        try {
          if(patientDetails){ // additional stupid check to remove typescript warning of undefined although check is already done above.
            const { data: updatedPatient }  = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientDetails.id}`);
            dispatch(AddPatient(updatedPatient));
          }
        } catch (e) {
          console.error(e.response.data);
        }
      };
      fetchPatientDetails();
    }
  },[patientDetails, dispatch, patients, id]);

  const submitNewEntry = async (values: HospitalEntryFormValues | HealthCheckEntryFormValues | OccupationalHealthcareEntryFormValues ) => {
    if(patientDetails){
      try {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patientDetails.id}/entries`,
          values
        );
        dispatch(AddPatient(newPatient));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };

  if(!patientDetails){
    return null;
  }

  return (
      <Container>
        <br />
        <h2>{patientDetails.name}
          {patientDetails.gender === Gender.Other ?  <Icon name="mars stroke" />
            : patientDetails.gender === Gender.Female ? <Icon name="venus" />
            : <Icon name="mars" />}
        </h2>
        <p>ssn: {patientDetails.ssn}</p>
        <p>occupation: {patientDetails.occupation}</p>
        <h3>entries</h3>
        {patientDetails.entries && 
          patientDetails.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
  );
};

export default PatientDetails;