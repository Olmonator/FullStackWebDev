import patients from "../../data/patients";
import { Entry } from "../types";
import { isString, isDate, isDischarge } from "../utils";

const checkEntry = (entry: Entry): boolean => { 
  if (!entry 
    || !entry.id || !isString(entry.id) 
    || !entry.description || !isString(entry.description)
    || !entry.date || !isDate(entry.date)
    || !entry.specialist || !isString(entry.specialist)
    || !entry.type || !isString(entry.type)) {
    return false
  }

  switch (entry.type) {
    case 'HealthCheck':
      if (entry.healthCheckRating >= 0 && entry.healthCheckRating <= 3) return true; else false;
      break;
    case 'Hospital':
      if (entry.discharge && isDischarge(entry.discharge)) return true; else false;
      break;
    case 'OccupationalHealthcare':
      if (entry.employerName && isString(entry.employerName)) return true; else false;
      break;
    default:
      return false;
  }
  return false;
};

const addEntry = ( entry: Entry, id: string  ): Entry => {
  const patient = patients.find(p => p.id === id);
  console.log(`Adding entry: ${entry} to patient: ${patient} ...`);
  if (checkEntry(entry)) {
    patient?.entries.push(entry);
    return entry;
  } else {
    throw new Error('Entry missing or malformatted');
  }
};

export default {
  addEntry
};