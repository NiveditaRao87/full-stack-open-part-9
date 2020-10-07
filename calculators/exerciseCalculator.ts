interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseHours {
  target: number;
  hours: Array<number>;
}

const parseArgs = (args: Array<string>): ExerciseHours => {
  if(args.length < 4) throw new Error('Not enough arguments');
  
  if(args.slice(2).find(arg => isNaN(Number(arg)))){
      throw new Error('Provided values were not numbers!')
  } else {
      return {
        target: Number(args[2]),
        hours: args.slice(3).map(arg => Number(arg))
      }
  }
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  
  const periodLength = hours.length;
  const average = hours.reduce((a,c) => a + c)/periodLength;
  const ratingCalc = (average - target)/target;
  const rating = ratingCalc >= 0 ? 3 : ratingCalc > -0.2 ? 2 : 1;
  const ratingDescription = ["Try harder next time",
                             "You almost made it",
                             "Wow! You were awesome"
                            ];
  return {
    periodLength,
    trainingDays: hours.filter(hour => hour !== 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingDescription[rating - 1],
    target,
    average
  }
}

try{
  const {target, hours} = parseArgs(process.argv);
  console.log(calculateExercises(target, hours));
}catch(e){
  console.log('Error, something bad happened, message: ', e.message);
}
