import axios from "axios";

export async function getUsers() {
  const response = await axios.get("/api/users");
  return response.data;
}
