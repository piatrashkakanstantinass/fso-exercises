import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnedcoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes)
    .filter((anecdote) => anecdote.content.includes(filter))
    .sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnedcoteList;
