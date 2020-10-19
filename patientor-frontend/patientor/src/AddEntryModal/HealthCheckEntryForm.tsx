import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, RadioButton, HealthCheckRatingOption  } from "../components/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from '../state';
import * as Yup from 'yup';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk"},
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk"}
];

export const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  
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
      healthCheckRating: Yup.number()
        .transform(value => Number(value))
        .required(requiredError)
  });
  
  return (
    <Formik
      initialValues={{
        specialist: "",
        date: "",
        description: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy
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
            <RadioButton
              label="Health Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
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

export default HealthCheckEntryForm;
