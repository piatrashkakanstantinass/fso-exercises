import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine name={"good"} value={good} />
            <StatisticLine name={"neutral"} value={neutral} />
            <StatisticLine name={"bad"} value={bad} />
            <StatisticLine name={"all"} value={all} />
            <StatisticLine name={"average"} value={(good - bad) / (all || 1)} />
            <StatisticLine
              name={"positive"}
              value={`${(good / (all || 1)) * 100} %`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
