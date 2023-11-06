import AnecdoteForm from "./components/AnecdoteForm";
import AnedcoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnedcoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
