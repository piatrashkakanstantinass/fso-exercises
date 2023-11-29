import { NewPatient, NonSensitivePatientEntry, Patient } from "../types";
import patients from "../data/patients";
import { v1 as uuid } from "uuid";

export function getNonSensitiveEntries(): NonSensitivePatientEntry[] {
  return patients.map(({ ssn, ...props }) => {
    ssn;
    return props;
  });
}

export function addPatient(patient: NewPatient): Patient {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
}
