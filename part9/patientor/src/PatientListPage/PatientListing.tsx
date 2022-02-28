import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import {  useStateValue, setPatient, createEntry } from "../state";
import {  Entry, Patient } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientListing = (): JSX.Element => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>(); 

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
          values
      );
      dispatch(createEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };

  
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
  if (!patient || patient.id !== id) {
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListing;