import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

export function getEntries(): Diagnosis[] {
  return diagnoses;
}
