import React from "react";
import { Entry, HealthCheckEntry, HealthCheckRating, 
  HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { Card, Icon, Header } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryContents: React.FC<{entry: Entry}> = ({ entry }) => {

  const [{ diagnoses }] = useStateValue();
  
  return (
    <>
      <em>{entry.description}</em>
      <ul>
        {entry.diagnosisCodes && 
          entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </ul>
    </>
  );

};

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Header as="h4" size="large">
          <span><span>{entry.date} </span>
          <Icon name="hospital" />
          </span>
        </Header>
      <EntryContents entry={entry} />
      {entry.discharge && <p><strong style={{"paddingRight": "20px"}}>Discharge</strong> 
            <em>Date: </em>{entry.discharge.date}
            <span style={{"paddingLeft": "20px"}}><em>Criteria:</em> {entry.discharge.criteria}</span>
          </p>}
      </Card.Content>
    </Card>
  );
};

const HealthCheckDetails: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  
  const healthRatingColour = new Map<HealthCheckRating, SemanticCOLORS>
    ([[HealthCheckRating.Healthy,"green"], [HealthCheckRating.LowRisk,"yellow"],
    [HealthCheckRating.HighRisk,"orange"], [HealthCheckRating.CriticalRisk,"red"]]);

  return (
    <Card fluid>
      <Card.Content>
        <Header as="h4" size="large">
          <span><span>{entry.date} </span>
          <Icon name="doctor" />
          </span>
        </Header>
        <EntryContents entry={entry} />
        <Icon name="heart" color={healthRatingColour.get(entry.healthCheckRating)} />
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareDetails: React.FC<{entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Header as="h4" size="large">
          <span><span>{entry.date} </span>
          <Icon name="stethoscope" />
          </span>
        </Header>
        <EntryContents entry={entry} />
        {entry.sickLeave && <p><strong style={{"paddingRight": "20px"}}>Sick Leave</strong> 
            <em>Start Date: </em>{entry.sickLeave.startDate}
            <span style={{"paddingLeft": "20px"}}><em>End Date:</em> {entry.sickLeave.endDate}</span>
          </p>}
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
  
};

export default EntryDetails;