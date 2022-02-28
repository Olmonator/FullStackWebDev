import React from "react";
import DiagnosisEntry from "../components/DiagnosisEntry";
import { Diagnosis } from "../types";

const DiagnosisList = ({ diagnoses, codes }: {diagnoses: Diagnosis[], codes: string[]} ): JSX.Element => {
  const entryDiagnoses = codes.map(code => diagnoses.find(diagnosis => diagnosis.code === code));
  return (
    <div>
      {entryDiagnoses.map(diagnosis =>
        diagnosis
          ? <DiagnosisEntry key={diagnosis.code} diagnosis={diagnosis} />
          : null
      )}
    </div>
  );
};

export default DiagnosisList;