import {v1 as uuid} from 'uuid';

import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getEntries = ():Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = ():Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id : string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  console.log(patient)
  return patient;
}

const addPatient = ( patient: NewPatient ): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries, getNonSensitiveEntries, addPatient, findById
};