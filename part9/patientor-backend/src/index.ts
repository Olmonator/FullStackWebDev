import express from 'express';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use(patientRouter);
app.use(diagnosisRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});