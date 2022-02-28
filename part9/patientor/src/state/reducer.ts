import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[]
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

export const createPatient = (content: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: content
  };
};

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: content
  };
};

export const setPatient = (content: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: content
  };
};

export const setDiagnosisList = (content: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: content
  };
};

export const createEntry = (content: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: content
  };
};