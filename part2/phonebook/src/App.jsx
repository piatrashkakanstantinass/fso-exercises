import { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = ({ value, onChange }) => (
  <p>
    filter shown with <input value={value} onChange={onChange} />
  </p>
);

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  return <div className={success ? "success" : "error"}>{message}</div>;
};

const PersonForm = ({
  persons,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function displayMessage(isSuccess, message) {
    if (isSuccess) {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 500);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (newName.length === 0 || newNumber.length === 0) {
          alert("Empty field(s)");
          return;
        }
        const foundPerson = persons.find((p) => p.name === newName);
        if (foundPerson) {
          if (
            confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            personService
              .update(foundPerson.id, {
                name: foundPerson.name,
                number: newNumber,
              })
              .then((returnedPerson) => {
                setNewName("");
                setNewNumber("");
                if (!returnedPerson) {
                  displayMessage(
                    false,
                    `Information on ${newName} has already been removed from the server`
                  );
                  return;
                }
                setPersons(
                  persons.map((p) =>
                    p.id === foundPerson.id ? returnedPerson : p
                  )
                );
                displayMessage(true, `Updated ${newName}`);
              })
              .catch((err) => {
                displayMessage(false, err.response.data.message);
              });
          }
          return;
        }
        personService
          .create({
            name: newName,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setNewName("");
            setNewNumber("");
            setPersons(persons.concat(returnedPerson));
            displayMessage(true, `Added ${newName}`);
          })
          .catch((err) => {
            displayMessage(false, err.response.data.error);
          });
      }}
    >
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, onDelete }) => (
  <ul>
    {persons
      .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map((p) => (
        <li key={p.name}>
          {p.name} {p.number}{" "}
          <button
            onClick={() => {
              if (confirm(`Delete ${p.name}`)) {
                personService.destroy(p.id).then(() => onDelete(p.id));
              }
            }}
          >
            delete
          </button>
        </li>
      ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} success={true} />
      <Notification message={errorMessage} success={false} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        onDelete={(id) => setPersons(persons.filter((p) => p.id !== id))}
      />
    </div>
  );
};

export default App;
