import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();
const PORT = 3003;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
