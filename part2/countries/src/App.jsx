import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const matches = countries.filter((c) => c.name.common.includes(filter));

  return (
    <>
      <div>
        find countries <input onChange={(e) => setFilter(e.target.value)} />
      </div>
      {matches.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : matches.length > 1 ? (
        matches.map((m, i) => <div key={i}>{m.name.common}</div>)
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
