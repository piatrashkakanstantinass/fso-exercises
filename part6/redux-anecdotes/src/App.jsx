import AnecdoteForm from "./components/AnecdoteForm";
import AnedcoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnedcoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
