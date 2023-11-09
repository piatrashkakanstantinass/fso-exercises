import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
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
const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions;

const filterReducer = filterSlice.reducer;
const { filterChange } = filterSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content);
    dispatch(addAnecdote(anecdote));
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export { filterChange, anecdoteReducer, filterReducer };
