import patients from "../../data/patients";
import { Entry, EntryType, EntryWithoutId } from "../types";
import { isString, isDate, isDischarge } from "../utils";
import {v1 as uuid} from 'uuid';

const checkEntry = (entry: Entry): boolean => { 
  if (!entry   
    || !entry.description || !isString(entry.description)
    || !entry.date || !isDate(entry.date)
    || !entry.specialist || !isString(entry.specialist)
    || !entry.type || !isString(entry.type)) {
    return false
  }

  switch (entry.type) {
    case EntryType.HealthCheck:
      if (entry.healthCheckRating >= 0 && entry.healthCheckRating <= 3) {
        return true
      } else false;
      break;
    case EntryType.Hospital:
      if (entry.discharge && isDischarge(entry.discharge)) return true; else false;
      break;
    case EntryType.OccupationalHealthcare:
      if (entry.employerName && isString(entry.employerName)) return true; else false;
      break;
    default:
      return false;
  }
  return false;
};

const addEntry = ( entry: EntryWithoutId, patientId: string  ): Entry => {
  const patient = patients.find(p => p.id === patientId);
  const newEntry = { id: uuid(), ...entry }
  console.log(`Adding entry: ${entry.description} to patient: ${patient?.name}`);
  if (checkEntry(newEntry)) {
    patient?.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error('Entry missing or malformatted'); 
  }
};

export default {
  addEntry
};