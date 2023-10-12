import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const matches = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

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
        matches.length === 1 && (
          <>
            <h1>{matches[0].name.common}</h1>
            <p>capital {matches[0].capital}</p>
            <p>area {matches[0].area}</p>
            <p>
              <b>languages:</b>
            </p>
            <ul>
              {Object.entries(matches[0].languages).map(([id, lang]) => (
                <li key={id}>{lang}</li>
              ))}
            </ul>
            <img src={matches[0].flags.png} />
          </>
        )
      )}
    </>
  );
}

export default App;
