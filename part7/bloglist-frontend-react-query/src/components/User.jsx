import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getUsers } from "../services/users";

export default function User() {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery("users", getUsers);

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  const user = data.find((u) => u.id === id);
  if (user === undefined) return "User not found";

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
}
