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

export default { setToken, getAll, create };
