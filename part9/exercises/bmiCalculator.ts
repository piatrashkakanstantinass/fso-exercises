export default function calculateBmi(height: number, weight: number) {
  console.log(height, weight);
  if (
    height <= 0 ||
    weight <= 0 ||
    !Number.isFinite(height) ||
    !Number.isFinite(weight)
  )
    throw new Error("Wrong arguments");
  const bmi = (weight / height ** 2) * 10_000;
  if (bmi < 18.5) return "Bad (underweight)";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Bad (overweight)";
  return "Bad (obesity)";
}

if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}
