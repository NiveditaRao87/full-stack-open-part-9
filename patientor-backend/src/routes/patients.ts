import express from 'express';
import patientService from '../services/patientServices';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);  
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((<Error>e).message);
  }
});

export default router;