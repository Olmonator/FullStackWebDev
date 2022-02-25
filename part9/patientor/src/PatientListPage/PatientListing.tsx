import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "../components/EntryDetails";

const PatientListing = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
      {patient.entries.length > 0
        ? <>
            <h4>entries</h4>
            {patient.entries.map(entry =>
              <EntryDetails key={entry.id} entry={entry} />
            )}
          </>
        : null
      }
    </div>
  );
};

export default PatientListing;