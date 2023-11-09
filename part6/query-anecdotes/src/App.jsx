import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";
import { useNotificationDispatch } from "../hooks/notification";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const addVote = useMutation({
    mutationFn: async (anecdote) => {
      const updatedAnecdote = await updateAnecdote({
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      queryClient.setQueryData(["anecdotes"], (old) =>
        old.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      );
    },
  });

  const handleVote = (anecdote) => {
    addVote.mutate(anecdote);
    notificationDispatch({ type: "SET", payload: `voted ${anecdote.content}` });
  };

  const fetchAnecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (fetchAnecdotes.isPending) {
    return <span>Loading...</span>;
  }

  if (fetchAnecdotes.isError) {
    return (
      <span>anecdote service not available due to problems in server</span>
    );
  }

  const anecdotes = fetchAnecdotes.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
