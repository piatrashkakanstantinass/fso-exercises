import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload));
    },
    addVote(state, action) {
      const anecdote = state.find((s) => s.id === action.payload);
      if (anecdote) {
        anecdote.votes++;
      }
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      return action.payload;
    },
  },
});

const anecdoteReducer = anecdoteSlice.reducer;
const { createAnecdote, addVote } = anecdoteSlice.actions;

const filterReducer = filterSlice.reducer;
const { filterChange } = filterSlice.actions;

export {
  createAnecdote,
  addVote,
  filterChange,
  anecdoteReducer,
  filterReducer,
};
