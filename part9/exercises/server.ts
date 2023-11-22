import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/hello", (_req, { send }) => send("Hello Full Stack!"));

app.get("/bmi", ({ query }, res) => {
  const { weight, height } = query;
  try {
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } catch {
    res.json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const body = req.body as { daily_exercises: number[]; target: number };
  const dailyExercises = body["daily_exercises"];
  const target = body["target"];
  if (dailyExercises === undefined || target === undefined) {
    res.json({ error: "parameters missing" });
    return;
  }
  try {
    if (!Array.isArray(dailyExercises)) {
      throw new Error("malformatted parameters");
    }
    res.json(
      calculateExercises(
        dailyExercises.map((i) => Number(i)),
        Number(target)
      )
    );
  } catch {
    res.json({ error: "malformatted parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
