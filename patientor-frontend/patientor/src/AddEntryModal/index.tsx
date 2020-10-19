import React, { useState } from 'react';
import { Modal, Segment, Dropdown, DropdownProps } from 'semantic-ui-react';
import HospitalEntryForm, { HospitalEntryFormValues } from './HospitalEntryForm';
import HealthCheckEntryForm, { HealthCheckEntryFormValues } from './HealthCheckEntryForm';
import OccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from './OccupationalHealthcareEntryForm';
import { EntryType } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues | 
    HealthCheckEntryFormValues | OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

export type EntryTypeOption = {
  value: EntryType;
  text: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, text: "Health Check" },
  { value: EntryType.Hospital, text: "Hospital" },
  { value: EntryType.OccupationalHealthcare, text: "Occupational Healthcare" }
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {

  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  const onChange = (event: React.SyntheticEvent<HTMLElement>, result: DropdownProps) => {
    setType(result.value as EntryType);
  };

  return (<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <p><strong>Entry type</strong></p>
      <Dropdown
      placeholder="Select entry type"
      options={entryTypeOptions}
      onChange={onChange}
      selection
      fluid
      search
      value={type}/>
      {type === EntryType.HealthCheck ? <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        : type === EntryType.Hospital ? <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        : <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />  }
    </Modal.Content>
  </Modal>
  );
};

export default AddEntryModal;
