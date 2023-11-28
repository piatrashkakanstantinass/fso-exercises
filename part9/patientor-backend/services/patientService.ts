import { NonSensitivePatientEntry } from "../types";
import patients from "../data/patients";

export function getNonSensitiveEntries(): NonSensitivePatientEntry[] {
  return patients.map(({ ssn, ...props }) => {
    ssn;
    return props;
  });
}
