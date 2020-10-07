const calculateBmi = (heightCms: number,weightKgs: number): string => {
    const bmi = weightKgs/(Math.pow(heightCms*0.01,2))
    
    const result = bmi < 15 ? "Very severely underweight"
      : bmi < 16 ? "Severely underweight"
      : bmi < 18.5 ? "Underweight"
      : bmi < 25 ? "Normal (healthy weight)"
      : bmi < 30 ? "Overweight"
      : bmi < 35 ? "Obese Class I (Moderately obese)"
      : bmi < 40 ? "Obese Class II (Severely obese)"
      : "Obese Class III (Very severely obese)"

    return result
}

console.log(calculateBmi(180, 74))
