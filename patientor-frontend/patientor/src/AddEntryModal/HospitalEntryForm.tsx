import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection  } from "../components/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from '../state';
import * as Yup from 'yup';

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  
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
      discharge: Yup.object().shape({
          date: Yup.date()
            .typeError('Invalid date format')
            .required(requiredError),
          criteria: Yup.string()
            .required(requiredError)
      })
  });
  
  return (
    <Formik
      initialValues={{
        specialist: "",
        date: "",
        description: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
            date: "",
            criteria: ""
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
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
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

export default HospitalEntryForm;
