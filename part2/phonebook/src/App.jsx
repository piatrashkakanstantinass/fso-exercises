import { useState } from "react";

const Filter = ({ value, onChange }) => (
  <p>
    filter shown with <input value={value} onChange={onChange} />
  </p>
);

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNewName("");
        setNewNumber("");
        if (newName.length === 0 || newNumber.length === 0) {
          alert("Empty field(s)");
          return;
        }
        if (persons.find((p) => p.name === newName)) {
          alert(`${newName} is already added to phonebook`);
          return;
        }
        setPersons(persons.concat({ name: newName, number: newNumber }));
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

const Persons = ({ persons, filter }) => (
  <ul>
    {persons
      .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map((p) => (
        <li key={p.name}>
          {p.name} {p.number}
        </li>
      ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
