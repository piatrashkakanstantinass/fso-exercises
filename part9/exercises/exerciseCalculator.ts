interface ExercisesInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  exerciseGoals: number[],
  target: number
): ExercisesInfo {
  if (
    !Number.isFinite(target) ||
    exerciseGoals.find((g) => !Number.isFinite(g) || g < 0) !== undefined
  )
    throw new Error("Wrong arguments");
  const sum = exerciseGoals.reduce((a, g) => a + g, 0);
  const average = sum / Math.max(1, exerciseGoals.length);
  let rating: number;
  let ratingDescription: string;
  const diff = average - target;
  if (diff >= 0) {
    (rating = 3), (ratingDescription = "perfect");
  } else if (diff > -1) {
    (rating = 2), (ratingDescription = "not too bad but could be better");
  } else {
    (rating = 1), (ratingDescription = "bad");
  }

  return {
    target,
    average,
    rating,
    ratingDescription,
    periodLength: exerciseGoals.length,
    trainingDays: exerciseGoals.filter((g) => g > 0).length,
    success: average >= target,
  };
}

const target = Number(process.argv[2]);
const goals = process.argv.slice(3).map((n) => Number(n));

console.log(calculateExercises(goals, target));
