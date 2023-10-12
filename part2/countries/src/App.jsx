import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const matches = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  let [lat, lon] = [null, null];
  if (matches.length === 1) {
    [lat, lon] = matches[0].latlng;
  }

  useEffect(() => {
    let ignore = false;
    if (lat !== null && lon !== null) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!ignore) {
            setTemp(data.main.temp);
            setWindSpeed(data.wind.speed);
            setWeatherIcon(data.weather[0].icon);
          }
        });
    }

    return () => (ignore = true);
  }, [lat, lon]);

  return (
    <>
      <div>
        find countries{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {matches.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : matches.length > 1 ? (
        matches.map((m, i) => (
          <div key={i}>
            {m.name.common}{" "}
            <button onClick={() => setFilter(m.name.common)}>show</button>
          </div>
        ))
      ) : (
        matches.length === 1 && (
          <>
            <h2>{matches[0].name.common}</h2>
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
            {temp !== null && (
              <>
                <h2>Weather in {matches[0].capital}</h2>
                <p>temperature {temp} Celcius</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                />
                <p>wind {windSpeed} m/s</p>
              </>
            )}
          </>
        )
      )}
    </>
  );
}

export default App;
