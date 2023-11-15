import axios from "axios";
const baseUrl = "/api/blogs";

const config = {
  headers: {},
};

const setToken = (newToken) => {
  config.headers.Authorization = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config);
};

const postComment = async (id, comment) => {
  await axios.post(`${baseUrl}/${id}/comments`, { comment });
};

export default { setToken, getAll, create, update, deleteBlog, postComment };
