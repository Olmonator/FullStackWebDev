import axios from "axios";
import React from "react";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setDiagnosisList, useStateValue } from "../state";
import { Diagnosis, Entry, EntryType } from "../types";

import { EntryBase } from "./Entries";

const heart = (rating: number): JSX.Element => {
  switch (rating) {
    case 0:
      return (
        <Icon name='heart' color="green" />
      );
    case 1:
      return (
        <Icon name='heart' color="yellow" />
      );
    case 2:
      return (
        <Icon name='heart' color="red" />
      );
    case 3:
      return (
        <Icon name='heart'/>
      );
    default:
      return (
        <p> error </p>
      );
  }
};

const divStyle = {
  border: '1px solid rgba(0, 0, 0, 0.05)',
  borderRadius: 5,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  marginBottom: 10,
};

const EntryDetails = ({ entry } : { entry: Entry }): JSX.Element => {
  const [{ diagnoses }, dispatch] = useStateValue();
  
  if (diagnoses.length === 0) {
    console.log('fetching diagnoses ENTRY: ', entry.type);
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
  switch(entry.type){
    case EntryType.Hospital:
      return (
        <div style={divStyle}>
          <EntryBase entry={entry} diagnoses={diagnoses} />
        </div>
      );
    case EntryType.HealthCheck:
      return (
        <div style={divStyle}>
          <EntryBase entry={entry} diagnoses={diagnoses}/>
          {heart(entry.healthCheckRating)}
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div style={divStyle}>
          <EntryBase entry={entry} diagnoses={diagnoses} />
        </div>
      );
    default:
      return (
        <div>
          Error
        </div>
      );
  }
};

export default EntryDetails;