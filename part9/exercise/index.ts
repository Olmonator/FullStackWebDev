import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { Exercise, calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) { 
    res.send({
      height: height,
      weight: weight,
      bmi: calculateBmi(Number(weight), Number(height))
    }); 
  } else {
    res.send({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises: Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  
  if (!daily_exercises || !target){
    res.send({
      error: 'arguments missing'
    });
  }
  if (isNaN(Number(target))) {
    res.send({
      error: 'malformatted input'
    });
  }
  daily_exercises.forEach((day: number) => {
    if (isNaN(Number(day))) {
      res.send({
        error: 'malformatted input'
      });
    }
  });
  
  const result: Exercise = calculateExercise(target, daily_exercises);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});