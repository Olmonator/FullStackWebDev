import React from "react";
import { Icon } from "semantic-ui-react";
import DiagnosisList from "../PatientListPage/DiagnosesList";
import { Diagnosis, Entry } from "../types";

const switchIcon = (type: string) => {
  switch (type) {
    case 'Hospital':
      return (
        <Icon name='medkit'/>
      );
    case 'HealthCheck':
      return (
        <Icon name='doctor'/>
      );
    case 'OccupationalHealthcare':
      return (
        <Icon name='stethoscope' />
      );
    default:
      return (
        <>
          <Icon name='bolt' />
        </>
      );
  }
};

export const EntryBase = ({ entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}): JSX.Element => {
  console.log('codes:', entry.diagnosisCodes);
  return (
    <div>
      <h2> 
        {entry.date} 
        {switchIcon(entry.type)} 
        {entry.type === 'OccupationalHealthcare'
          ? entry.employerName
          : null
        }
      </h2>
      {entry.description}
      {entry.diagnosisCodes
        ? <DiagnosisList diagnoses={diagnoses} codes={entry.diagnosisCodes} />
        : null
      }
    </div>
  );
};

