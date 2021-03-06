import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection  } from "../components/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from '../state';
import * as Yup from 'yup';

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const OccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  
  const [{ diagnoses }] = useStateValue();
  
  const requiredError = "Field is required";

  const validationSchema = Yup.object().shape({
      specialist: Yup.string()
        .required(requiredError),
      date: Yup.date()
        .typeError('Invalid date format')
        .required(requiredError),
      description: Yup.string()
        .required(requiredError),
      employerName: Yup.string()
        .required(requiredError),
      sickLeave: Yup.object().shape({
          startDate: Yup.date()
            .typeError('Invalid date format')
            .max(Yup.ref('endDate'),"start date can't be after end date"),
          endDate: Yup.date()
            .typeError('Invalid date format')
            .min(
              Yup.ref('startDate'),
              "end date can't be before start date"
            ),
      })
  });
  
  return (
    <Formik
      initialValues={{
        specialist: "",
        date: "",
        description: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareEntryForm;
