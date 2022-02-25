import React from 'react';
import { Diagnosis } from '../types';

const DiagnosisEntry = ({ diagnosis }: { diagnosis: Diagnosis }): JSX.Element => {
  return (
    <div>
        {diagnosis.code} {diagnosis.name}
    </div>
  );
};

export default DiagnosisEntry;