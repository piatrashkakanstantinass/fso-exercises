import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => (await axios.get(BASE_URL)).data;

export const addAnecdote = async (content) => {
  try {
    return (await axios.post(BASE_URL, { content, votes: 0 })).data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
};

export const updateAnecdote = async (anecdote) =>
  (await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote)).data;
