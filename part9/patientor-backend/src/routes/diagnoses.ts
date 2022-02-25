import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

export default router;