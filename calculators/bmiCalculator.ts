interface CalculatorInputs {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): CalculatorInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (heightCms: number,weightKgs: number): string => {
    const bmi = weightKgs/(Math.pow(heightCms*0.01,2));
    
    const result = bmi < 15 ? "Very severely underweight"
      : bmi < 16 ? "Severely underweight"
      : bmi < 18.5 ? "Underweight"
      : bmi < 25 ? "Normal (healthy weight)"
      : bmi < 30 ? "Overweight"
      : bmi < 35 ? "Obese Class I (Moderately obese)"
      : bmi < 40 ? "Obese Class II (Severely obese)"
      : "Obese Class III (Very severely obese)";

    return result;
}

try{
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}catch(e){
  console.log('Error, something bad happened, message: ', e.message);
}