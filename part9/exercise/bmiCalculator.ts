interface InputVals {
  value1: number;
  value2: number;
}

const parseArgs = (args: Array<string>): InputVals => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (mass: number, height: number): string => {
  // calculate bmi
  if (height < 0 || mass < 0) {
    throw new Error("height or mass smaller than 0");
  }
  const bmi = mass / (height * height);
  console.log("bmi is: ", bmi);
  if (bmi < 18.5) {
    return('Underweight');
  } else if (bmi < 25.0) {
    return('Normal');
  } else if (bmi < 30) {
    return('Overweight');
  } else {
    return('Obese');
  }
};

try {
  const { value1, value2 } = parseArgs(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}