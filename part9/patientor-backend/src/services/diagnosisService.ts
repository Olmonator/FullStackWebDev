import diagnosisData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getEntries = ():Array<Diagnosis> => {
  return diagnosisData;
};

export default {
  getEntries,
};