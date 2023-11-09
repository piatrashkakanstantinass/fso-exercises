import axios from "axios";

const BASE_URL = "http://localhost:3000/anecdotes";

const createAnecdote = async (content) => {
  const response = await axios.post(BASE_URL, {
    content,
    votes: 0,
  });
  return response.data;
};

const getAnecdotes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const updateAnecdote = async (id, anecdote) => {
  const response = await axios.put(`${BASE_URL}/${id}`, anecdote);
  return response.data;
};

export default { createAnecdote, getAnecdotes, updateAnecdote };
