import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { Patient } from '../types'
import { apiBaseUrl } from "../constants";
import { AddPatient, useStateValue } from "../state";

const PatientDetails: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patientDetails, setPatientDetails] = React.useState<Patient | undefined>(undefined) 
  
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
    };
  },[patientDetails, dispatch, patients, id]);

  if(!patientDetails){
    return null
  };

  return (
      <Container>
        <br />
        <h2>{patientDetails.name}
          {patientDetails.gender === "other" ?  <Icon name="mars stroke" />
            : patientDetails.gender === "female" ? <Icon name="venus" />
            : <Icon name="mars" />}
        </h2>
        <p>ssn: {patientDetails.ssn}</p>
        <p>occupation: {patientDetails.occupation}</p>
      </Container>
  );
};

export default PatientDetails;