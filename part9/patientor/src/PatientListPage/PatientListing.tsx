import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setDiagnosisList, setPatient, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";

const PatientListing = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses, patient }, dispatch] = useStateValue();

  if (!patient || patient.id !== id) {
    console.log('fetching patient data');
    React.useEffect(() => {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }, [dispatch]); 
    if (diagnoses.length === 0) {
      React.useEffect(() => {
        const fetchDiagnosisCodes = async () => {
          try {
            const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
              `${apiBaseUrl}/diagnoses`
            );
    
            dispatch(setDiagnosisList(diagnosesFromApi));
          } catch (e) {
            console.error(e);
          }
        };
        void fetchDiagnosisCodes();
      }, [dispatch]);
    }
    return (
      <div>
        <Icon loading name='spinner' size='big' />
      </div>
    );
  }
  
  return (
    <div>
      <h2>
        {patient.name} 
        
        {patient.gender === 'male' ? <Icon name='mars' /> : null}
        {patient.gender === 'female' ? <Icon name='venus' /> : null}
        {patient.gender === 'other' ? <Icon name='transgender alternate' /> : null}
      </h2>
      
      <p>
        ssn: {patient.ssn}
      </p>
      <p>
        occupation: {patient.occupation}
      </p>
      <h4>entries</h4>
      {patient.entries.map(entry => 
        <div key={entry.id}>
          {entry.date}: {entry.description}
          {!diagnoses ?  <Icon loading name='spinner' size='big' /> :
            <ul>
              {entry.diagnosisCodes?.map(code => 
                <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
              )}
            </ul>
          }
        </div>
      )}
    </div>
  );
};

export default PatientListing;