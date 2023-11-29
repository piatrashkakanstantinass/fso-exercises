import { Gender, NewPatient } from "./types";

function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function isGender(gender: string): gender is Gender {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
}

function parseString(name: unknown): string {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
}

export function toNewPatient(object: unknown): NewPatient {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    return {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
    };
  }
  throw new Error("Incorrect data: a field missing");
}
