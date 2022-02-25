type RatingDescription = "you failed" | "better than nothing" | "almost there" | "success";

export interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}
/*
interface InputValues {
  value1: number;
  value2: Array<number>;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (!isNaN(Number(args[2]))) {
    const value1 = Number(args[2]);
    for (let i = 3; i < args.length; i++) {
      if(isNaN(Number(args[i]))) {
        throw new Error("one or more days of exercise is not a number");
      }
    }
    const value2 = args.splice(3).map(el => Number(el));
    return {
      value1,
      value2
    };
  } else {
    throw new Error("target not a number");
  }
};
*/
export const calculateExercise = (target: number, hours: Array<number>): Exercise => {
  const periodLength = hours.length;
  if(periodLength < 1) {
    throw new Error("no days given");
  }
  const trainingDays = hours.filter(day => day !== 0).length;
  const average = (hours.reduce((a, b) => a+b) / periodLength);
  const success = (target) < average;
  let rating = 0;
  let ratingDescription: RatingDescription = "you failed";
  const ratingNumber = average / target;
  if (ratingNumber > 1)  {
    rating = 3;
    ratingDescription = "success";
  } else if (ratingNumber > 0.75) {
    rating = 2;
    ratingDescription = "almost there";
  } else if (ratingNumber > 0.25) {
    rating = 1;
    ratingDescription = "better than nothing";
  }
  const result: Exercise = {periodLength, trainingDays, success, rating, ratingDescription, target, average };
  return result;
};
/*
try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateExercise(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {  
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/