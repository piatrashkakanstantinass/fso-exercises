import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../services/anecdotes";
import { useNotificationDispatch } from "../../hooks/notification";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const createAnecdote = useMutation({
    mutationFn: async (content) => {
      const newAnecdote = await addAnecdote(content);
      queryClient.setQueryData(["anecdotes"], (old) => [...old, newAnecdote]);
    },
    onError: (err) => {
      notificationDispatch({ type: "SET", payload: err.message });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote.mutate(content);
    notificationDispatch({
      type: "SET",
      payload: `anecdote ${content} created`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
