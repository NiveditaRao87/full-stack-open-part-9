import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

type ExerciseInput = {
  target: number,
  daily_exercises: Array<number>
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!height || !weight){
    return res.status(400).json({error: "malformatted parameters"});
  }

  const response = {
    height,
    weight,
    bmi: calculateBmi(height, weight)
  };
  return res.json(response);
});

app.post('/exercise', (req,res) => {
  
  const {target, daily_exercises} = req.body as ExerciseInput;  

  if(!target || !daily_exercises || daily_exercises.length < 1){
    return res.json({error: "parameters missing"});
  }
  if(isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.find(e => isNaN(e))){
    return res.json({error: "malformatted parameters"});
  }

  return res.json(calculateExercises(target, daily_exercises));

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});